import {
  AKASHA_TREE_STEP_NAME,
  akashaTreeStep,
} from "../akasha-tree-step/akasha-tree-step.module.code.ts"
import type {
  StepDefinition,
  WorkflowConfigJson,
} from "../creator-code/creator-code.module.code.ts"
import type { Choice } from "../creator-selecting/creator-selecting.module.code.ts"
import { statusAsPagesSpell } from "../creator-vocabulary/creator-vocabulary.module.code.ts"
import type {
  PipelinePlan,
  StepPlan,
  WorkflowPlan,
} from "../pipeline-page-creating/pipeline-page-creating.module.code.ts"

export const WORKFLOW_KINDS: readonly string[] = ["foundation", "preparation", "checks", "apps"]

const STATED_BY_THE_PAGE: readonly string[] = ["name", "dependsOn"]

const INPUTS_HASH = /^[0-9a-f]{12}$/

export interface PlanArgs {
  readonly branch: string
  readonly commit: string
  readonly instructionsCommit: string
  readonly changedFiles: readonly string[]
  readonly treeHash: string | null
  readonly choice: Choice
}

function asPageKey(key: string): string {
  return key.replace(/[A-Z]/g, (one) => `-${one.toLowerCase()}`)
}

export function definitionOf(stepConfig: unknown): Readonly<Record<string, unknown>> {
  if (typeof stepConfig !== "object" || stepConfig === null || Array.isArray(stepConfig)) return {}
  const definition: Record<string, unknown> = {}
  for (const [key, value] of Object.entries(stepConfig as Record<string, unknown>)) {
    if (STATED_BY_THE_PAGE.includes(key)) continue
    if (value === null || value === undefined) continue
    definition[asPageKey(key)] = value
  }
  return definition
}

function stepPlanOf(step: StepDefinition): StepPlan {
  return {
    title: step.name,
    dependsOn: step.dependsOn ?? [],
    whenConditions: (step.whenConditions?.status ?? []).map(statusAsPagesSpell),
    alwaysRuns: step.alwaysRun === true,
    definition: definitionOf(step.stepConfig),
  }
}

export function kindOf(config: WorkflowConfigJson): string | null {
  const kind = config.kind
  if (kind === undefined) return null
  if (WORKFLOW_KINDS.includes(kind)) return kind
  console.error(
    `main-pipeline-creator: workflow ${config.name} states kind=${kind}, which is not one of ` +
      `${WORKFLOW_KINDS.join(", ")} — landing it with no kind`
  )
  return null
}

function workflowPlanOf(config: WorkflowConfigJson, changedFiles: readonly string[]): WorkflowPlan {
  const inputsHash = config.inputsHash
  return {
    name: config.name,
    kind: kindOf(config),
    dependsOn: config.dependsOn ?? [],
    whenBranch: config.whenBranch ?? null,
    alwaysRuns: config.alwaysRun === true,
    inputsHash: typeof inputsHash === "string" && INPUTS_HASH.test(inputsHash) ? inputsHash : null,
    changedFiles,
    steps: (config.steps ?? []).map(stepPlanOf),
  }
}

const PREPARATION_KIND = "preparation"

const NEEDS_AKASHA_TREE = "preparation-prep"

function withAkashaTree(plan: WorkflowPlan, akashaCommit: string): WorkflowPlan {
  if (plan.kind !== PREPARATION_KIND) return plan
  const steps = plan.steps.map((one) =>
    one.title === NEEDS_AKASHA_TREE && !one.dependsOn.includes(AKASHA_TREE_STEP_NAME)
      ? { ...one, dependsOn: [...one.dependsOn, AKASHA_TREE_STEP_NAME] }
      : one
  )
  if (steps.some((one) => one.title === AKASHA_TREE_STEP_NAME)) return { ...plan, steps }
  return { ...plan, steps: [...steps, akashaTreeStep(akashaCommit)] }
}

export function planPipeline(args: PlanArgs): PipelinePlan {
  return {
    branch: args.branch,
    commit: args.commit,
    instructionsCommit: args.instructionsCommit,
    changedFiles: args.changedFiles,
    treeHash: args.treeHash,
    mainPredecessorSeqs: args.choice.mainPredecessorSeqs,
    overtakenSeqs: args.choice.overtakenSeqs,
    workflows: args.choice.workflows.map((one) =>
      withAkashaTree(workflowPlanOf(one.config, one.changedFiles), args.commit)
    ),
  }
}
