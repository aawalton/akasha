import { writeFile } from "node:fs/promises"
import type { Answer } from "@akasha/command-system/calling"
import { OperationalError } from "@akasha/errors-core/exit-code"
import { buildCopFetchInit } from "@akasha/inference-clients/cop-fetch"
import { ensureOutputDir, resolveOutputPath } from "@akasha/inference-clients/inference-output-path"
import { buildInferenceRunRecord } from "@akasha/inference-runs/inference-run-record"
import type { InferenceService } from "@akasha/inference-runs/inference-run-services"
import { recordInferenceRun } from "@akasha/inference-runs/inference-run-store"
import {
  answering,
  calledAs,
  heldOr,
  oneOf,
  proseNeededAt,
  refusedBy,
  serviceNamed,
  told,
  wasRefused,
  wordsIn,
  wroteTo,
} from "../inference-answering/inference-answering.module.code.ts"

const INSTRUCT = "--instruct"

const TEXT = "--text"

const SERVICE = "--service"

const LANG = "--lang"

const OUTPUT = "--output"

const NO_PERSIST = "--no-persist"

const TAKING = [
  { said: INSTRUCT, prose: true },
  { said: TEXT, prose: true },
  { said: SERVICE },
  { said: LANG },
  { said: OUTPUT, aliases: ["--out"] },
]

const SWITCHES = [NO_PERSIST]

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

const DEFAULT_LANG = "English"

const TIMEOUT_MS = 1_800_000

const SAMPLING = {
  temperature: 0.7,
  topP: 0.95,
  topK: 40,
  repetitionPenalty: 1.0,
  maxTokens: 1200,
} as const

const RIFF_HEADER = 44

const RIFF = [0x52, 0x49, 0x46, 0x46]

export function isRiff(bytes: Uint8Array): boolean {
  return bytes.length > RIFF_HEADER && RIFF.every((one, at) => bytes[at] === one)
}

export async function inferenceVoiceDesign(argv: readonly string[]): Promise<Answer> {
  const said = wordsIn(argv, TAKING, SWITCHES)
  if (wasRefused(said)) return refusedBy(said.refused)

  const refusals: string[] = said.loose.map(
    (one) => `\`${one}\` follows nothing this takes — it takes flags alone`
  )
  const instruct = heldOr(await proseNeededAt(said, INSTRUCT), refusals)
  const text = heldOr(await proseNeededAt(said, TEXT), refusals)
  const backendName = heldOr(oneOf(said, SERVICE, BACKEND_NAMES, DEFAULT_BACKEND), refusals)
  if (refusals.length > 0 || instruct === null || text === null || backendName === null) {
    return refusedBy(refusals)
  }

  const backend = BACKENDS[backendName ?? DEFAULT_BACKEND]
  if (backend === undefined) {
    return refusedBy([`\`${SERVICE}\` takes one of ${BACKEND_NAMES.join(", ")}`])
  }
  const lang = said.named[LANG] ?? DEFAULT_LANG

  return await answering(async () => {
    const reached = serviceNamed(backend.service)
    const nowMs = Date.now()
    const outputPath = resolveOutputPath("voice-design", said.named[OUTPUT], nowMs)

    const record = buildInferenceRunRecord({
      service: backend.service,
      operation: "voice-design",
      model: backend.model,
      host: reached.service.host,
      commandLine: calledAs("inference-voice-design", argv),
      startedAt: new Date(nowMs).toISOString(),
      instruct,
      text,
      ...(backend.sendsLang ? { lang } : {}),
      ...SAMPLING,
    })

    const report: string[] = []
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
        report.push(wroteTo(outputPath, wav, "audio"))
        return { outputPath, outputBytes: wav }
      },
      { persist: !said.flags.has(NO_PERSIST) }
    )
    return told(report)
  })
}
