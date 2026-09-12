import { writeFile } from "node:fs/promises"
import { wordsOf } from "akasha/agents/hooks/shell-calls/shell-calls.module.code.ts"
import {
  type TakenFor,
  takenFor,
} from "akasha/commands/arguments/argument-taking/argument-taking.module.code.ts"
import { guidance as guidanceArgument } from "akasha/commands/arguments/pages/guidance.argument.ts"
import { noPersist } from "akasha/commands/arguments/pages/no-persist.argument.ts"
import { output as outputArgument } from "akasha/commands/arguments/pages/output.argument.ts"
import { promptFile } from "akasha/commands/arguments/pages/prompt-file.argument.ts"
import { renderPrompt } from "akasha/commands/arguments/pages/render-prompt.argument.ts"
import { seed as seedArgument } from "akasha/commands/arguments/pages/seed.argument.ts"
import { service as serviceArgument } from "akasha/commands/arguments/pages/service.argument.ts"
import { size as sizeArgument } from "akasha/commands/arguments/pages/size.argument.ts"
import { steps as stepsArgument } from "akasha/commands/arguments/pages/steps.argument.ts"
import { timeout as timeoutArgument } from "akasha/commands/arguments/pages/timeout.argument.ts"
import {
  answering,
  refusedBy,
  told,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { filing, filledIn } from "akasha/commands/modules/filling/command-filling.module.code.ts"
import { inferenceGenerate as page } from "akasha/commands/pages/inference/generate/inference-generate.command.ts"
import {
  ensureOutputDir,
  resolveOutputPath,
} from "akasha/infrastructure/inference/clients/inference-output-path/inference-output-path.module.code.ts"
import {
  drawSeed,
  resolveSeed,
} from "akasha/infrastructure/inference/clients/inference-seed/inference-seed.module.code.ts"
import {
  buildGenerationBody,
  parseGenerationSize,
  runGeneration,
} from "akasha/infrastructure/inference/clients/mlx-image-client/mlx-image-client.module.code.ts"
import {
  boundTo,
  serviceNamed,
  wroteTo,
} from "akasha/infrastructure/inference/commands/inference-answering/inference-answering.module.code.ts"
import { buildInferenceRunRecord } from "akasha/infrastructure/inference/runs/record/inference-run-record.module.code.ts"
import type { InferenceService } from "akasha/infrastructure/inference/runs/services/inference-run-services.module.code.ts"
import { INFERENCE_SERVICES } from "akasha/infrastructure/inference/runs/services/inference-run-services.module.code.ts"
import { recordInferenceRun } from "akasha/infrastructure/inference/runs/store/inference-run-store.module.code.ts"

const PAGES = [
  guidanceArgument,
  noPersist,
  outputArgument,
  promptFile,
  renderPrompt,
  seedArgument,
  serviceArgument,
  sizeArgument,
  stepsArgument,
  timeoutArgument,
]

type Taken = TakenFor<typeof page, (typeof PAGES)[number]>

const PROMPT = filing(renderPrompt.said)

const DEFAULT_SERVICE = "image-gen"

const DEFAULT_SIZE = "1024x1024"

const DEFAULT_TIMEOUT_SEC = 600

const FALLBACK_MODEL = "Tongyi-MAI/Z-Image-Turbo"

const STEPS_MIN = 1

const STEPS_MAX = 50

const MODEL_TYPE = "--model-type"

const MODEL_PATH = "--model-path"

const IMAGE_GENERATION = "image-generation"

const SECOND_MS = 1000

export function generates(command: readonly string[]): boolean {
  return boundTo(command, MODEL_TYPE) === IMAGE_GENERATION
}

function isService(one: string): one is InferenceService {
  return (INFERENCE_SERVICES as readonly string[]).includes(one)
}

function guidanceOf(raw: string | undefined): number | undefined {
  if (raw === undefined) return undefined
  const held = Number(raw)
  return Number.isFinite(held) && held >= 0 ? held : undefined
}

function wrongIn(taken: Taken): readonly string[] {
  const wrong: string[] = []
  const raw = taken.guidance
  if (raw !== undefined && guidanceOf(raw) === undefined) {
    const said = guidanceArgument.said
    wrong.push(`\`${said}\` takes a number at or above zero, and \`${raw}\` is not one`)
  }
  const steps = taken.steps
  if (steps !== undefined && (steps < STEPS_MIN || steps > STEPS_MAX)) {
    const said = stepsArgument.said
    wrong.push(`\`${said}\` runs from ${STEPS_MIN} to ${STEPS_MAX}, and ${steps} is outside it`)
  }
  const serviceName = taken.service ?? DEFAULT_SERVICE
  if (!isService(serviceName)) {
    const said = serviceArgument.said
    const every = INFERENCE_SERVICES.join(", ")
    wrong.push(`\`${said}\` takes one of ${every}, and \`${serviceName}\` is none of them`)
  }
  return wrong
}

export async function inferenceGenerate(argv: readonly string[], given: Given): Promise<Answer> {
  const read = takenFor(argv, given.calledAs, page, PAGES)
  if ("refused" in read) return refusedBy(read.refused)
  const taken: Taken = read.taken

  const wrong = wrongIn(taken)
  if (wrong.length > 0) return refusedBy(wrong)

  const asked = filledIn(given.root, taken.renderPrompt, taken.promptFile, PROMPT)
  if ("refused" in asked) return refusedBy(asked.refused)

  const serviceName = taken.service ?? DEFAULT_SERVICE
  if (!isService(serviceName)) return refusedBy(wrongIn(taken))

  const prompt = asked.text ?? ""
  const seed = taken.seed
  const steps = taken.steps
  const timeout = taken.timeout ?? DEFAULT_TIMEOUT_SEC
  const guidance = guidanceOf(taken.guidance)
  const size = taken.size ?? DEFAULT_SIZE

  return await answering(async (done) => {
    const { width, height } = parseGenerationSize(size)
    const reached = serviceNamed(serviceName)
    const words = wordsOf(reached.service.runs)
    if (!generates(words)) {
      return refusedBy([
        `\`${serviceArgument.said} ${serviceName}\` binds no \`${MODEL_TYPE} ${IMAGE_GENERATION}\`, so it renders nothing`,
      ])
    }
    const model = boundTo(words, MODEL_PATH) ?? FALLBACK_MODEL
    const drawn = resolveSeed(seed, drawSeed)
    const nowMs = Date.now()
    const outputPath = resolveOutputPath("generate", taken.output, nowMs)

    const record = buildInferenceRunRecord({
      service: serviceName,
      operation: "generate",
      model,
      host: reached.service.host,
      commandLine: given.calledWhole ?? given.calledAs,
      startedAt: new Date(nowMs).toISOString(),
      prompt,
      size,
      width,
      height,
      seed: drawn,
      ...(steps === undefined ? {} : { steps }),
      ...(guidance === undefined ? {} : { guidance }),
    })

    await recordInferenceRun(
      record,
      async () => {
        const png = await runGeneration({
          baseUrl: reached.baseUrl,
          body: buildGenerationBody({
            model,
            prompt,
            size,
            seed: drawn,
            ...(guidance === undefined ? {} : { guidance }),
            ...(steps === undefined ? {} : { steps }),
          }),
          timeoutMs: timeout * SECOND_MS,
        })
        await ensureOutputDir(outputPath)
        await writeFile(outputPath, png)
        done.push(wroteTo(outputPath, png, "image"))
        return { outputPath, outputBytes: png }
      },
      done,
      { persist: !taken.noPersist }
    )
    return told(done)
  })
}
