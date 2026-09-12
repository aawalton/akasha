import { access, writeFile } from "node:fs/promises"
import { OperationalError } from "akasha/alan/harness/errors-core/exit-code/exit-code.module.code.ts"
import {
  type TakenFor,
  takenFor,
} from "akasha/commands/arguments/modules/argument-taking/argument-taking.module.code.ts"
import { mode as modeArgument } from "akasha/commands/arguments/pages/mode.argument.ts"
import { noPersist } from "akasha/commands/arguments/pages/no-persist.argument.ts"
import { output as outputArgument } from "akasha/commands/arguments/pages/output.argument.ts"
import { priority as priorityArgument } from "akasha/commands/arguments/pages/priority.argument.ts"
import { refAudio as refAudioArgument } from "akasha/commands/arguments/pages/ref-audio.argument.ts"
import { refText as refTextArgument } from "akasha/commands/arguments/pages/ref-text.argument.ts"
import { refTextFile } from "akasha/commands/arguments/pages/ref-text-file.argument.ts"
import { spokenText } from "akasha/commands/arguments/pages/spoken-text.argument.ts"
import { textFile } from "akasha/commands/arguments/pages/text-file.argument.ts"
import { timeout as timeoutArgument } from "akasha/commands/arguments/pages/timeout.argument.ts"
import {
  answering,
  refusedBy,
  told,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { filing, filledIn } from "akasha/commands/modules/filling/command-filling.module.code.ts"
import { inferenceVoiceClone as page } from "akasha/commands/pages/inference/voice/clone/inference-voice-clone.command.ts"
import { buildCopFetchInit } from "akasha/infrastructure/inference/clients/cop-fetch/cop-fetch.module.code.ts"
import {
  ensureOutputDir,
  resolveOutputPath,
} from "akasha/infrastructure/inference/clients/inference-output-path/inference-output-path.module.code.ts"
import { isRiff } from "akasha/infrastructure/inference/clients/riff-bytes/riff-bytes.module.code.ts"
import {
  buildSpeechRequestBody,
  copPriorityHeaders,
} from "akasha/infrastructure/inference/clients/voice-clone-client/voice-clone-client.module.code.ts"
import {
  serviceNamed,
  targetOf,
  wroteTo,
} from "akasha/infrastructure/inference/commands/inference-answering/inference-answering.module.code.ts"
import { scpUpload } from "akasha/infrastructure/inference/pool/inference-ssh/inference-ssh.module.code.ts"
import { recordInferenceRun } from "akasha/infrastructure/inference/runs/modules/store/inference-run-store.module.code.ts"
import { buildInferenceRunRecord } from "akasha/infrastructure/inference/runs/record/inference-run-record.module.code.ts"
import { SCRATCH_AT } from "akasha/utils/fs/scratching/scratching.module.code.ts"

const PAGES = [
  modeArgument,
  noPersist,
  outputArgument,
  priorityArgument,
  refAudioArgument,
  refTextArgument,
  refTextFile,
  spokenText,
  textFile,
  timeoutArgument,
]

type Taken = TakenFor<typeof page, (typeof PAGES)[number]>

const TEXT = filing(spokenText.said)

const REF_TEXT = filing(refTextArgument.said)

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

function isPriority(one: string): one is Priority {
  return (PRIORITIES as readonly string[]).includes(one)
}

function isMode(one: string): one is Mode {
  return (MODES as readonly string[]).includes(one)
}

function wrongIn(taken: Taken): readonly string[] {
  const wrong: string[] = []
  if (!isPriority(taken.priority)) {
    const lane = taken.priority
    const said = priorityArgument.said
    wrong.push(`\`${said}\` takes one of ${PRIORITIES.join(", ")}, and \`${lane}\` is none of them`)
  }
  const how = taken.mode
  if (how !== undefined && !isMode(how)) {
    const said = modeArgument.said
    wrong.push(`\`${said}\` takes one of ${MODES.join(", ")}, and \`${how}\` is none of them`)
  }
  const lacking = taken.refText === undefined && taken.refTextFile === undefined
  if (taken.refAudio !== undefined && lacking) {
    const said = refAudioArgument.said
    wrong.push(`\`${said}\` names a clip, and \`${refTextArgument.said}\` says what that clip says`)
  }
  return wrong
}

export async function inferenceVoiceClone(argv: readonly string[], given: Given): Promise<Answer> {
  const read = takenFor(argv, given.calledAs, page, PAGES)
  if ("refused" in read) return refusedBy(read.refused)
  const taken: Taken = read.taken

  const wrong = wrongIn(taken)
  if (wrong.length > 0) return refusedBy(wrong)

  const spoken = filledIn(given.root, taken.spokenText, taken.textFile, TEXT)
  if ("refused" in spoken) return refusedBy(spoken.refused)
  const transcript = filledIn(given.root, taken.refText, taken.refTextFile, REF_TEXT)
  if ("refused" in transcript) return refusedBy(transcript.refused)

  const text = spoken.text ?? ""
  const refTextSaid = transcript.text
  const timeout = taken.timeout ?? DEFAULT_TIMEOUT_SEC
  const refAudio = taken.refAudio
  const priority: Priority = isPriority(taken.priority) ? taken.priority : "normal"
  const how = taken.mode
  const mode: Mode | undefined = how !== undefined && isMode(how) ? how : undefined

  return await answering(async (done) => {
    if (refAudio !== undefined) {
      try {
        await access(refAudio)
      } catch {
        return refusedBy([
          `\`${refAudioArgument.said}\` names \`${refAudio}\`, which will not read`,
        ])
      }
    }

    const reached = serviceNamed(SERVICE)
    const nowMs = Date.now()
    const outputPath = resolveOutputPath("voice-clone", taken.output, nowMs)
    const stamp = `${process.pid}-${nowMs}`
    const refAudioRemote =
      refAudio === undefined
        ? DEFAULT_REF_AUDIO
        : `${SCRATCH_AT}/inference-voice-clone-ref-${stamp}.wav`
    const refText = refTextSaid ?? DEFAULT_REF_TEXT

    const record = buildInferenceRunRecord({
      service: SERVICE,
      operation: "voice-clone",
      model: MODEL,
      host: reached.service.host,
      commandLine: given.calledWhole ?? given.calledAs,
      startedAt: new Date(nowMs).toISOString(),
      text,
      refAudioPath: refAudio ?? DEFAULT_REF_AUDIO,
      refText,
    })

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
        done.push(wroteTo(outputPath, wav, "audio"))
        return { outputPath, outputBytes: wav }
      },
      done,
      { persist: !taken.noPersist }
    )
    return told(done)
  })
}
