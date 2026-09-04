import { discoverWorkflows } from "@akasha/workflow-language/workflow-discovery"
import type { Step, Workflow } from "@akasha/workflow-language/workflow-types"
import { z } from "zod"
import {
  COLD_STAGE_STEP_NAMES,
  type PhaseSelection,
  selectPhaseSteps,
  WARM_PREP_STEP_NAMES,
} from "../benchmark-phases/benchmark-phases.module.code.ts"
import {
  assembleInnerReport,
  BENCHMARK_REPORT_SENTINEL,
  BENCHMARK_STEP_CONCURRENCY,
  computeBenchmarkExit,
  createSemaphore,
  phaseRepoRoot,
} from "../benchmark-report-assembly/benchmark-report-assembly.module.code.ts"
import {
  type BenchmarkPhase,
  type StepTiming,
  StoreVariantSchema,
} from "../benchmark-report-types/benchmark-report-types.module.code.ts"
import { runWorkflow } from "../bootstrap-running/bootstrap-running.module.code.ts"
import { LocalExecutor } from "../local-executor/local-executor.module.code.ts"
import type {
  PipelineContext,
  StepConfig,
} from "../local-step-types/local-step-types.module.code.ts"

const PRELUDE_DIR = "/prelude"

const PREPARATION_WORKFLOW = "preparation"

const CHECK_WORKFLOW = "check"

const CI_SECRET_KEYS: readonly string[] = [
  "GIT_ACCESS_TOKEN",
  "SUPABASE_URL",
  "SUPABASE_SERVICE_ROLE_KEY",
  "AGE_SECRET_KEY",
]

const RunnerArgsSchema = z
  .object({
    sha: z.string().min(1),
    node: z.string().min(1),
    store: StoreVariantSchema,
    instructionsRoot: z.string().min(1),
  })
  .strict()
type RunnerArgs = z.infer<typeof RunnerArgsSchema>

function camel(flag: string): string {
  return flag.replace(/-([a-z])/g, (_whole, letter: string) => letter.toUpperCase())
}

function parseArgs(argv: readonly string[]): RunnerArgs {
  const raw: Record<string, string> = {}
  for (let i = 0; i < argv.length; i += 1) {
    const token = argv[i]
    if (token === undefined || !token.startsWith("--")) continue
    const key = camel(token.slice(2))
    const next = argv[i + 1]
    if (next !== undefined && !next.startsWith("--")) {
      raw[key] = next
      i += 1
    }
  }
  return RunnerArgsSchema.parse(raw)
}

function buildSecrets(): Map<string, string> {
  const secrets = new Map<string, string>()
  for (const key of CI_SECRET_KEYS) {
    const value = z.string().optional().parse(process.env[key])
    if (value != null && value !== "") secrets.set(key, value)
  }
  return secrets
}

interface PhasePlan {
  readonly phase: BenchmarkPhase
  readonly allSteps: readonly Step[]
  readonly wanted?: readonly string[]
}

function stepsOf(found: readonly Workflow[], name: string, root: string): readonly Step[] {
  const held = found.find((one) => one.name === name)
  if (held === undefined) {
    throw new Error(
      `benchmark: no workflow named \`${name}\` stands among the ${found.length} discovered under ` +
        `${root}, so the phase built from it would time nothing. This benchmark reports on what the ` +
        "pipeline runs, and it cannot report on a workflow it never found."
    )
  }
  const steps = held.steps ?? []
  if (steps.length === 0) {
    throw new Error(
      `benchmark: the workflow \`${name}\` discovered under ${root} carries no step, so the phase ` +
        "built from it would time nothing and report a duration for it regardless."
    )
  }
  return steps
}

async function buildPhasePlans(args: RunnerArgs): Promise<readonly PhasePlan[]> {
  const found = await discoverWorkflows(args.instructionsRoot, { codeRoot: PRELUDE_DIR })
  const prepSteps = stepsOf(found, PREPARATION_WORKFLOW, args.instructionsRoot)
  const checkSteps = stepsOf(found, CHECK_WORKFLOW, args.instructionsRoot)
  console.log(
    `[benchmark] ${found.length} workflow(s) discovered under ${args.instructionsRoot} against the ` +
      `code tree at ${PRELUDE_DIR}: \`${PREPARATION_WORKFLOW}\` carries ${prepSteps.length} step(s), ` +
      `\`${CHECK_WORKFLOW}\` carries ${checkSteps.length}`
  )
  return [
    { phase: "cold-stage", allSteps: prepSteps, wanted: COLD_STAGE_STEP_NAMES },
    { phase: "warm-prep", allSteps: prepSteps, wanted: WARM_PREP_STEP_NAMES },
    { phase: "check", allSteps: checkSteps },
  ]
}

interface ActivePhase {
  readonly phase: BenchmarkPhase
  readonly originalImageByName: ReadonlyMap<string, string>
}

async function main(): Promise<void> {
  const args = parseArgs(process.argv.slice(2))
  const secrets = buildSecrets()

  const base = LocalExecutor()
  const sem = createSemaphore(BENCHMARK_STEP_CONCURRENCY)
  const timings: StepTiming[] = []
  let active: ActivePhase | null = null

  const executor: LocalExecutor = {
    ...base,
    executeStep: (step: StepConfig, context: PipelineContext) =>
      sem.run(async () => {
        const result = await base.executeStep(step, context)
        if (active !== null) {
          timings.push({
            name: step.name,
            phase: active.phase,
            durationMs: result.duration,
            exitCode: result.exitCode,
            image: active.originalImageByName.get(step.name) ?? step.image,
            skipped: false,
          })
        }
        return result
      }),
  }

  const phaseFailures: string[] = []
  const wallStart = performance.now()

  for (const plan of await buildPhasePlans(args)) {
    const selection: PhaseSelection = selectPhaseSteps(plan.allSteps, plan.wanted)
    for (const s of selection.skipped) {
      timings.push({
        name: s.name,
        phase: plan.phase,
        durationMs: 0,
        exitCode: 0,
        image: s.image,
        skipped: true,
      })
    }

    if (selection.runnable.length === 0) {
      console.log(`[benchmark] ${plan.phase}: no runnable steps`)
      continue
    }

    const workflow: Workflow = {
      name: `benchmark-${plan.phase}`,
      when: { event: "push" },
      steps: selection.runnable,
    }
    active = { phase: plan.phase, originalImageByName: selection.originalImageByName }
    console.log(
      `[benchmark] ${plan.phase}: running ${selection.runnable.length} step(s), ` +
        `${selection.skipped.length} foreign-runtime skipped`
    )

    const result = await runWorkflow({
      workflowName: workflow.name,
      workflow,
      seq: 0,
      sha: args.sha,
      branch: "benchmark",
      event: "push",
      repoRoot: phaseRepoRoot(plan.phase, args.sha, PRELUDE_DIR),
      executor,
      secrets,
      graphFileSet: [],
    })
    active = null

    if (!result.ok) {
      if (plan.phase === "check") {
        console.error(`[benchmark] check completed with red step(s): ${result.error}`)
      } else {
        phaseFailures.push(`${plan.phase}: ${result.error}`)
        console.error(`[benchmark] ${plan.phase} failed: ${result.error}`)
        break
      }
    }
  }

  const wallClockMs = performance.now() - wallStart
  const report = assembleInnerReport({
    node: args.node,
    store: args.store,
    targetSha: args.sha,
    wallClockMs,
    steps: timings,
  })

  console.log(`${BENCHMARK_REPORT_SENTINEL} ${JSON.stringify(report)}`)
  process.exit(computeBenchmarkExit(phaseFailures))
}

await main()
