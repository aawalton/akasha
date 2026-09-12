import { setTimeout as sleep } from "node:timers/promises"
import {
  type TakenFor,
  takenFor,
} from "akasha/commands/arguments/modules/argument-taking/argument-taking.module.code.ts"
import { duration as durationArgument } from "akasha/commands/arguments/pages/duration.argument.ts"
import { lyrics as lyricsArgument } from "akasha/commands/arguments/pages/lyrics.argument.ts"
import { lyricsFile } from "akasha/commands/arguments/pages/lyrics-file.argument.ts"
import { noPersist } from "akasha/commands/arguments/pages/no-persist.argument.ts"
import { output as outputArgument } from "akasha/commands/arguments/pages/output.argument.ts"
import { promptFile } from "akasha/commands/arguments/pages/prompt-file.argument.ts"
import { renderPrompt } from "akasha/commands/arguments/pages/render-prompt.argument.ts"
import { seed as seedArgument } from "akasha/commands/arguments/pages/seed.argument.ts"
import { steps as stepsArgument } from "akasha/commands/arguments/pages/steps.argument.ts"
import { timeout as timeoutArgument } from "akasha/commands/arguments/pages/timeout.argument.ts"
import { vocalLanguage as vocalLanguageArgument } from "akasha/commands/arguments/pages/vocal-language.argument.ts"
import {
  answering,
  refusedBy,
  told,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { filing, filledIn } from "akasha/commands/modules/filling/command-filling.module.code.ts"
import { inferenceMusic as page } from "akasha/commands/pages/inference/music/inference-music.command.ts"
import { resolveOutputPath } from "akasha/infrastructure/inference/clients/inference-output-path/inference-output-path.module.code.ts"
import {
  drawSeed,
  resolveSeed,
} from "akasha/infrastructure/inference/clients/inference-seed/inference-seed.module.code.ts"
import { runMusic } from "akasha/infrastructure/inference/clients/modules/ace-step-client/ace-step-client.module.code.ts"
import {
  serviceNamed,
  wroteTo,
} from "akasha/infrastructure/inference/commands/inference-answering/inference-answering.module.code.ts"
import { recordInferenceRun } from "akasha/infrastructure/inference/runs/modules/store/inference-run-store.module.code.ts"
import { buildInferenceRunRecord } from "akasha/infrastructure/inference/runs/record/inference-run-record.module.code.ts"

const PAGES = [
  durationArgument,
  lyricsFile,
  lyricsArgument,
  noPersist,
  outputArgument,
  promptFile,
  renderPrompt,
  seedArgument,
  stepsArgument,
  timeoutArgument,
  vocalLanguageArgument,
]

type Taken = TakenFor<typeof page, (typeof PAGES)[number]>

const PROMPT = filing(renderPrompt.said)

const LYRICS = filing(lyricsArgument.said)

const SERVICE = "music-gen"

const DIT_MODEL = "acestep-v15-turbo"

const LM_MODEL = "acestep-5Hz-lm-1.7B"

const DEFAULT_STEPS = 8

const DEFAULT_TIMEOUT_SEC = 1800

const SUBMIT_TIMEOUT_MS = 300_000

const POLL_INTERVAL_MS = 5_000

const SECOND_MS = 1000

export async function inferenceMusic(argv: readonly string[], given: Given): Promise<Answer> {
  const read = takenFor(argv, given.calledAs, page, PAGES)
  if ("refused" in read) return refusedBy(read.refused)
  const taken: Taken = read.taken

  const asked = filledIn(given.root, taken.renderPrompt, taken.promptFile, PROMPT)
  if ("refused" in asked) return refusedBy(asked.refused)
  const sung = filledIn(given.root, taken.lyrics, taken.lyricsFile, LYRICS)
  if ("refused" in sung) return refusedBy(sung.refused)

  const prompt = asked.text ?? ""
  const lyrics = sung.text
  const durationSeconds = taken.duration
  const inferenceSteps = taken.steps ?? DEFAULT_STEPS
  const seed = taken.seed
  const timeout = taken.timeout ?? DEFAULT_TIMEOUT_SEC
  const vocalLanguage = taken.vocalLanguage

  return await answering(async (done) => {
    const reached = serviceNamed(SERVICE)
    const drawn = resolveSeed(seed, drawSeed)
    const nowMs = Date.now()
    const outputPath = resolveOutputPath("music", taken.output, nowMs)

    const record = buildInferenceRunRecord({
      service: SERVICE,
      operation: "music",
      model: DIT_MODEL,
      host: reached.service.host,
      commandLine: given.calledWhole ?? given.calledAs,
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
      async () => {
        const made = await runMusic({
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
        })
        done.push(wroteTo(made.outputPath, made.outputBytes, "audio"))
        return made
      },
      done,
      { persist: !taken.noPersist }
    )
    return told(done)
  })
}
