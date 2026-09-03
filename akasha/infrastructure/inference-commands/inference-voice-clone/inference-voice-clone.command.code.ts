import { access, writeFile } from "node:fs/promises"
import type { Answer } from "@akasha/command-system/calling"
import { OperationalError } from "@akasha/errors-core/exit-code"
import { buildCopFetchInit } from "@akasha/inference-clients/cop-fetch"
import { ensureOutputDir, resolveOutputPath } from "@akasha/inference-clients/inference-output-path"
import {
  buildSpeechRequestBody,
  copPriorityHeaders,
} from "@akasha/inference-clients/voice-clone-client"
import { scpUpload } from "@akasha/inference-pool/inference-ssh"
import { buildInferenceRunRecord } from "@akasha/inference-runs/inference-run-record"
import { recordInferenceRun } from "@akasha/inference-runs/inference-run-store"
import {
  answering,
  calledAs,
  countAt,
  heldOr,
  oneOf,
  proseAt,
  proseNeededAt,
  refusalIn,
  refusedBy,
  serviceNamed,
  targetOf,
  told,
  wordsIn,
  wroteTo,
} from "../inference-answering/inference-answering.module.code.ts"

const TEXT = "--text"

const REF_AUDIO = "--ref-audio"

const REF_TEXT = "--ref-text"

const OUTPUT = "--output"

const PRIORITY = "--priority"

const TIMEOUT = "--timeout"

const MODE = "--mode"

const NO_PERSIST = "--no-persist"

const TAKING = [
  { said: TEXT, prose: true },
  { said: REF_AUDIO, aliases: ["--ref"] },
  { said: REF_TEXT, prose: true },
  { said: OUTPUT, aliases: ["--out"] },
  { said: PRIORITY },
  { said: TIMEOUT },
  { said: MODE },
]

const SWITCHES = [NO_PERSIST]

const PRIORITIES = ["normal", "high"] as const

type Priority = (typeof PRIORITIES)[number]

const MODES = ["generation", "continuation"] as const

type Mode = (typeof MODES)[number]

const SERVICE = "moss-tts"

const MODEL = "OpenMOSS-Team/MOSS-TTS-v1.5"

const DEFAULT_REF_AUDIO = "/Users/walton/inference/moss-tts/ref-audio.wav"

const DEFAULT_REF_TEXT = "The quick brown fox jumps over the lazy dog."

const DEFAULT_TIMEOUT_SEC = 1800

const SECOND_MS = 1000

const RIFF_HEADER = 44

const RIFF = [0x52, 0x49, 0x46, 0x46]

export function isRiff(bytes: Uint8Array): boolean {
  return bytes.length > RIFF_HEADER && RIFF.every((one, at) => bytes[at] === one)
}

function isPriority(one: string): one is Priority {
  return (PRIORITIES as readonly string[]).includes(one)
}

function isMode(one: string): one is Mode {
  return (MODES as readonly string[]).includes(one)
}

export async function inferenceVoiceClone(argv: readonly string[]): Promise<Answer> {
  const said = wordsIn(argv, TAKING, SWITCHES)
  const saidRefused = refusalIn(said)
  if (saidRefused !== null) return refusedBy(saidRefused)

  const refusals: string[] = said.loose.map(
    (one) => `\`${one}\` follows nothing this takes — it takes flags alone`
  )
  const text = heldOr(await proseNeededAt(said, TEXT), refusals)
  const refTextSaid = heldOr(await proseAt(said, REF_TEXT), refusals) ?? undefined
  const timeout =
    heldOr(countAt(said, TIMEOUT, DEFAULT_TIMEOUT_SEC), refusals) ?? DEFAULT_TIMEOUT_SEC
  const priorityRaw = heldOr(oneOf(said, PRIORITY, [...PRIORITIES], PRIORITIES[0]), refusals)
  const modeRaw = heldOr(oneOf(said, MODE, [...MODES], undefined), refusals) ?? undefined

  const refAudio = said.named[REF_AUDIO]
  if (refAudio !== undefined && refTextSaid === undefined) {
    refusals.push(`\`${REF_AUDIO}\` names a clip, and \`${REF_TEXT}\` says what that clip says`)
  }
  if (refusals.length > 0 || text === null || priorityRaw === null) return refusedBy(refusals)

  const priority: Priority = isPriority(priorityRaw) ? priorityRaw : "normal"
  const mode: Mode | undefined = modeRaw !== undefined && isMode(modeRaw) ? modeRaw : undefined

  return await answering(async () => {
    if (refAudio !== undefined) {
      try {
        await access(refAudio)
      } catch {
        return refusedBy([`\`${REF_AUDIO}\` names \`${refAudio}\`, which will not read`])
      }
    }

    const reached = serviceNamed(SERVICE)
    const nowMs = Date.now()
    const outputPath = resolveOutputPath("voice-clone", said.named[OUTPUT], nowMs)
    const stamp = `${process.pid}-${nowMs}`
    const refAudioRemote =
      refAudio === undefined ? DEFAULT_REF_AUDIO : `/tmp/inference-voice-clone-ref-${stamp}.wav`
    const refText = refTextSaid ?? DEFAULT_REF_TEXT

    const record = buildInferenceRunRecord({
      service: SERVICE,
      operation: "voice-clone",
      model: MODEL,
      host: reached.service.host,
      commandLine: calledAs("inference-voice-clone", argv),
      startedAt: new Date(nowMs).toISOString(),
      text,
      refAudioPath: refAudio ?? DEFAULT_REF_AUDIO,
      refText,
    })

    const report: string[] = []
    await recordInferenceRun(
      record,
      async () => {
        if (refAudio !== undefined) {
          await scpUpload(targetOf(reached.host), refAudio, refAudioRemote)
        }
        const init = buildCopFetchInit({
          method: "POST",
          headers: { "Content-Type": "application/json", ...copPriorityHeaders(priority) },
          body: JSON.stringify(
            buildSpeechRequestBody({
              model: MODEL,
              text,
              refAudioRemote,
              refText,
              ...(mode === undefined ? {} : { mode }),
            })
          ),
          timeoutMs: timeout * SECOND_MS,
        })
        const answered = await fetch(`${reached.baseUrl}/v1/audio/speech`, init)
        if (!answered.ok) {
          throw new OperationalError(
            `voice-clone failed: ${answered.status} ${await answered.text()}`
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
