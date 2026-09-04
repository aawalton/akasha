import { setTimeout as sleep } from "node:timers/promises"
import type { Answer } from "@akasha/command-system/calling"
import { runMusic } from "@akasha/inference-clients/ace-step-client"
import { resolveOutputPath } from "@akasha/inference-clients/inference-output-path"
import { drawSeed, resolveSeed } from "@akasha/inference-clients/inference-seed"
import { buildInferenceRunRecord } from "@akasha/inference-runs/inference-run-record"
import { recordInferenceRun } from "@akasha/inference-runs/inference-run-store"
import {
  answering,
  calledAs,
  countAt,
  heldOr,
  proseAt,
  proseNeededAt,
  refusedBy,
  serviceNamed,
  told,
  wasRefused,
  wordsIn,
} from "../inference-answering/inference-answering.module.code.ts"

const PROMPT = "--prompt"

const LYRICS = "--lyrics"

const DURATION = "--duration"

const STEPS = "--steps"

const SEED = "--seed"

const VOCAL_LANGUAGE = "--vocal-language"

const TIMEOUT = "--timeout"

const OUTPUT = "--output"

const NO_PERSIST = "--no-persist"

const TAKING = [
  { said: PROMPT, prose: true },
  { said: LYRICS, prose: true },
  { said: DURATION },
  { said: STEPS },
  { said: SEED },
  { said: VOCAL_LANGUAGE },
  { said: TIMEOUT },
  { said: OUTPUT, aliases: ["--out"] },
]

const SWITCHES = [NO_PERSIST]

const SERVICE = "music-gen"

const DIT_MODEL = "acestep-v15-turbo"

const LM_MODEL = "acestep-5Hz-lm-1.7B"

const DEFAULT_DURATION_SEC = 30

const DEFAULT_STEPS = 8

const DEFAULT_LANGUAGE = "en"

const DEFAULT_TIMEOUT_SEC = 1800

const SUBMIT_TIMEOUT_MS = 300_000

const POLL_INTERVAL_MS = 5_000

const SECOND_MS = 1000

export async function inferenceMusic(argv: readonly string[]): Promise<Answer> {
  const said = wordsIn(argv, TAKING, SWITCHES)
  if (wasRefused(said)) return refusedBy(said.refused)

  const refusals: string[] = said.loose.map(
    (one) => `\`${one}\` follows nothing this takes — it takes flags alone`
  )
  const prompt = heldOr(await proseNeededAt(said, PROMPT), refusals)
  const lyrics = heldOr(await proseAt(said, LYRICS), refusals) ?? undefined
  const durationSeconds =
    heldOr(countAt(said, DURATION, DEFAULT_DURATION_SEC), refusals) ?? DEFAULT_DURATION_SEC
  const inferenceSteps = heldOr(countAt(said, STEPS, DEFAULT_STEPS), refusals) ?? DEFAULT_STEPS
  const seed = heldOr(countAt(said, SEED, undefined), refusals) ?? undefined
  const timeout =
    heldOr(countAt(said, TIMEOUT, DEFAULT_TIMEOUT_SEC), refusals) ?? DEFAULT_TIMEOUT_SEC
  if (refusals.length > 0 || prompt === null) return refusedBy(refusals)

  const vocalLanguage = said.named[VOCAL_LANGUAGE] ?? DEFAULT_LANGUAGE

  return await answering(async () => {
    const reached = serviceNamed(SERVICE)
    const drawn = resolveSeed(seed, drawSeed)
    const nowMs = Date.now()
    const outputPath = resolveOutputPath("music", said.named[OUTPUT], nowMs)

    const record = buildInferenceRunRecord({
      service: SERVICE,
      operation: "music",
      model: DIT_MODEL,
      host: reached.service.host,
      commandLine: calledAs("inference-music", argv),
      startedAt: new Date(nowMs).toISOString(),
      prompt,
      seed: drawn,
      steps: inferenceSteps,
      duration: durationSeconds,
      vocalLanguage,
      ditModel: DIT_MODEL,
      lmModel: LM_MODEL,
      ...(lyrics === undefined ? {} : { lyrics }),
    })

    await recordInferenceRun(
      record,
      async () =>
        await runMusic({
          baseUrl: reached.baseUrl,
          params: {
            prompt,
            durationSeconds,
            inferenceSteps,
            seed: drawn,
            vocalLanguage,
            audioFormat: "wav",
            ...(lyrics === undefined ? {} : { lyrics }),
          },
          outputPath,
          submitTimeoutMs: SUBMIT_TIMEOUT_MS,
          pollIntervalMs: POLL_INTERVAL_MS,
          totalTimeoutMs: timeout * SECOND_MS,
          sleep: (ms: number) => sleep(ms),
          now: () => Date.now(),
        }),
      { persist: !said.flags.has(NO_PERSIST) }
    )
    return told([`wrote ${outputPath}`])
  })
}
