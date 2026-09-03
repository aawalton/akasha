import { writeFile } from "node:fs/promises"
import type { Answer } from "@akasha/command-system/calling"
import { ensureOutputDir, resolveOutputPath } from "@akasha/inference-clients/inference-output-path"
import { drawSeed, resolveSeed } from "@akasha/inference-clients/inference-seed"
import {
  buildGenerationBody,
  parseGenerationSize,
  runGeneration,
} from "@akasha/inference-clients/mlx-image-client"
import { buildInferenceRunRecord } from "@tools/lib/inference/inference-run-record"
import type { InferenceService } from "@tools/lib/inference/inference-run-services"
import { INFERENCE_SERVICES } from "@tools/lib/inference/inference-run-services"
import { recordInferenceRun } from "@tools/lib/inference/inference-run-store"
import {
  answering,
  calledAs,
  countAt,
  heldOr,
  proseNeededAt,
  refusalIn,
  refusedBy,
  serviceNamed,
  told,
  wordsIn,
  wroteTo,
} from "../inference-answering/inference-answering.module.code.ts"

const PROMPT = "--prompt"

const OUTPUT = "--output"

const SIZE = "--size"

const SEED = "--seed"

const GUIDANCE = "--guidance"

const STEPS = "--steps"

const TIMEOUT = "--timeout"

const SERVICE = "--service"

const NO_PERSIST = "--no-persist"

const TAKING = [
  { said: PROMPT, prose: true },
  { said: OUTPUT, aliases: ["--out"] },
  { said: SIZE },
  { said: SEED },
  { said: GUIDANCE },
  { said: STEPS },
  { said: TIMEOUT },
  { said: SERVICE },
]

const SWITCHES = [NO_PERSIST]

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

export function boundTo(command: readonly string[], flag: string): string | undefined {
  const at = command.indexOf(flag)
  return at >= 0 ? command[at + 1] : undefined
}

export function generates(command: readonly string[]): boolean {
  return boundTo(command, MODEL_TYPE) === IMAGE_GENERATION
}

function isService(one: string): one is InferenceService {
  return (INFERENCE_SERVICES as readonly string[]).includes(one)
}

export function guidanceOf(raw: string | undefined, refusals: string[]): number | undefined {
  if (raw === undefined) return undefined
  const held = Number(raw)
  if (!Number.isFinite(held) || held < 0) {
    refusals.push(`\`${GUIDANCE}\` takes a number at or above zero, and \`${raw}\` is not one`)
    return undefined
  }
  return held
}

export async function inferenceGenerate(argv: readonly string[]): Promise<Answer> {
  const said = wordsIn(argv, TAKING, SWITCHES)
  const saidRefused = refusalIn(said)
  if (saidRefused !== null) return refusedBy(saidRefused)

  const refusals: string[] = said.loose.map(
    (one) => `\`${one}\` follows nothing this takes — it takes flags alone`
  )
  const prompt = heldOr(await proseNeededAt(said, PROMPT), refusals)
  const seed = heldOr(countAt(said, SEED, undefined), refusals) ?? undefined
  const steps = heldOr(countAt(said, STEPS, undefined), refusals) ?? undefined
  const timeout =
    heldOr(countAt(said, TIMEOUT, DEFAULT_TIMEOUT_SEC), refusals) ?? DEFAULT_TIMEOUT_SEC
  const guidance = guidanceOf(said.named[GUIDANCE], refusals)

  if (steps !== undefined && (steps < STEPS_MIN || steps > STEPS_MAX)) {
    refusals.push(`\`${STEPS}\` runs from ${STEPS_MIN} to ${STEPS_MAX}, and ${steps} is outside it`)
  }

  const serviceName = said.named[SERVICE] ?? DEFAULT_SERVICE
  if (!isService(serviceName)) {
    refusals.push(
      `\`${SERVICE}\` takes one of ${INFERENCE_SERVICES.join(", ")}, and \`${serviceName}\` is none of them`
    )
  }

  const size = said.named[SIZE] ?? DEFAULT_SIZE
  if (refusals.length > 0 || prompt === null || !isService(serviceName)) {
    return refusedBy(refusals)
  }

  return await answering(async () => {
    const { width, height } = parseGenerationSize(size)
    const reached = serviceNamed(serviceName)
    if (!generates(reached.service.command)) {
      return refusedBy([
        `\`${SERVICE} ${serviceName}\` binds no \`${MODEL_TYPE} ${IMAGE_GENERATION}\`, so it renders nothing`,
      ])
    }
    const model = boundTo(reached.service.command, MODEL_PATH) ?? FALLBACK_MODEL
    const drawn = resolveSeed(seed, drawSeed)
    const nowMs = Date.now()
    const outputPath = resolveOutputPath("generate", said.named[OUTPUT], nowMs)

    const record = buildInferenceRunRecord({
      service: serviceName,
      operation: "generate",
      model,
      host: reached.service.host,
      commandLine: calledAs("inference-generate", argv),
      startedAt: new Date(nowMs).toISOString(),
      prompt,
      size,
      width,
      height,
      seed: drawn,
      ...(steps === undefined ? {} : { steps }),
      ...(guidance === undefined ? {} : { guidance }),
    })

    const report: string[] = []
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
        report.push(wroteTo(outputPath, png, "image"))
        return { outputPath, outputBytes: png }
      },
      { persist: !said.flags.has(NO_PERSIST) }
    )
    return told(report)
  })
}
