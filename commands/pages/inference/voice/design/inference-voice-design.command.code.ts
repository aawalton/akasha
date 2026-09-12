import { writeFile } from "node:fs/promises"
import { OperationalError } from "akasha/alan/harness/errors-core/exit-code/exit-code.module.code.ts"
import {
  type TakenFor,
  takenFor,
} from "akasha/commands/arguments/argument-taking/argument-taking.module.code.ts"
import { instruct as instructArgument } from "akasha/commands/arguments/pages/instruct.argument.ts"
import { instructFile } from "akasha/commands/arguments/pages/instruct-file.argument.ts"
import { lang as langArgument } from "akasha/commands/arguments/pages/lang.argument.ts"
import { noPersist } from "akasha/commands/arguments/pages/no-persist.argument.ts"
import { output as outputArgument } from "akasha/commands/arguments/pages/output.argument.ts"
import { service as serviceArgument } from "akasha/commands/arguments/pages/service.argument.ts"
import { spokenText } from "akasha/commands/arguments/pages/spoken-text.argument.ts"
import { textFile } from "akasha/commands/arguments/pages/text-file.argument.ts"
import {
  answering,
  refusedBy,
  told,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { filing, filledIn } from "akasha/commands/modules/filling/command-filling.module.code.ts"
import { inferenceVoiceDesign as page } from "akasha/commands/pages/inference/voice/design/inference-voice-design.command.ts"
import { buildCopFetchInit } from "akasha/infrastructure/inference/clients/cop-fetch/cop-fetch.module.code.ts"
import {
  ensureOutputDir,
  resolveOutputPath,
} from "akasha/infrastructure/inference/clients/inference-output-path/inference-output-path.module.code.ts"
import { isRiff } from "akasha/infrastructure/inference/clients/riff-bytes/riff-bytes.module.code.ts"
import {
  serviceNamed,
  wroteTo,
} from "akasha/infrastructure/inference/commands/inference-answering/inference-answering.module.code.ts"
import { buildInferenceRunRecord } from "akasha/infrastructure/inference/runs/record/inference-run-record.module.code.ts"
import type { InferenceService } from "akasha/infrastructure/inference/runs/services/inference-run-services.module.code.ts"
import { recordInferenceRun } from "akasha/infrastructure/inference/runs/store/inference-run-store.module.code.ts"

const PAGES = [
  instructArgument,
  instructFile,
  langArgument,
  noPersist,
  outputArgument,
  serviceArgument,
  spokenText,
  textFile,
]

type Taken = TakenFor<typeof page, (typeof PAGES)[number]>

const INSTRUCT = filing(instructArgument.said)

const TEXT = filing(spokenText.said)

type Backend = {
  readonly service: InferenceService
  readonly model: string
  readonly sendsLang: boolean
}

const BACKENDS: Readonly<Record<string, Backend>> = {
  voxcpm2: {
    service: "voxcpm2",
    model: "mlx-community/VoxCPM2-bf16",
    sendsLang: false,
  },
  "qwen3-tts": {
    service: "qwen3-tts",
    model: "mlx-community/Qwen3-TTS-12Hz-1.7B-VoiceDesign-bf16",
    sendsLang: true,
  },
}

const BACKEND_NAMES = Object.keys(BACKENDS)

const DEFAULT_BACKEND = "voxcpm2"

const TIMEOUT_MS = 1_800_000

const SAMPLING = {
  temperature: 0.7,
  topP: 0.95,
  topK: 40,
  repetitionPenalty: 1.0,
  maxTokens: 1200,
} as const

function wrongIn(taken: Taken): readonly string[] {
  const named = taken.service ?? DEFAULT_BACKEND
  if (BACKENDS[named] !== undefined) return []
  const said = serviceArgument.said
  const every = BACKEND_NAMES.join(", ")
  return [`\`${said}\` takes one of ${every}, and \`${named}\` is none of them`]
}

export async function inferenceVoiceDesign(argv: readonly string[], given: Given): Promise<Answer> {
  const read = takenFor(argv, given.calledAs, page, PAGES)
  if ("refused" in read) return refusedBy(read.refused)
  const taken: Taken = read.taken

  const wrong = wrongIn(taken)
  if (wrong.length > 0) return refusedBy(wrong)

  const described = filledIn(given.root, taken.instruct, taken.instructFile, INSTRUCT)
  if ("refused" in described) return refusedBy(described.refused)
  const spoken = filledIn(given.root, taken.spokenText, taken.textFile, TEXT)
  if ("refused" in spoken) return refusedBy(spoken.refused)

  const backend = BACKENDS[taken.service ?? DEFAULT_BACKEND]
  if (backend === undefined) return refusedBy(wrongIn(taken))

  const instruct = described.text ?? ""
  const text = spoken.text ?? ""
  const lang = taken.lang

  return await answering(async (done) => {
    const reached = serviceNamed(backend.service)
    const nowMs = Date.now()
    const outputPath = resolveOutputPath("voice-design", taken.output, nowMs)

    const record = buildInferenceRunRecord({
      service: backend.service,
      operation: "voice-design",
      model: backend.model,
      host: reached.service.host,
      commandLine: given.calledWhole ?? given.calledAs,
      startedAt: new Date(nowMs).toISOString(),
      instruct,
      text,
      ...(backend.sendsLang ? { lang } : {}),
      ...SAMPLING,
    })

    await recordInferenceRun(
      record,
      async () => {
        const init = buildCopFetchInit({
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            model: backend.model,
            input: text,
            instruct,
            ...(backend.sendsLang ? { lang_code: lang } : {}),
            response_format: "wav",
          }),
          timeoutMs: TIMEOUT_MS,
        })
        const answered = await fetch(`${reached.baseUrl}/v1/audio/speech`, init)
        if (!answered.ok) {
          throw new OperationalError(
            `voice-design failed: ${answered.status} ${await answered.text()}`
          )
        }
        const wav = new Uint8Array(await answered.arrayBuffer())
        if (!isRiff(wav)) throw new OperationalError("what came back is no RIFF payload")
        await ensureOutputDir(outputPath)
        await writeFile(outputPath, wav)
        done.push(wroteTo(outputPath, wav, "audio"))
        return { outputPath, outputBytes: wav }
      },
      done,
      { persist: !taken.noPersist }
    )
    return told(done)
  })
}
