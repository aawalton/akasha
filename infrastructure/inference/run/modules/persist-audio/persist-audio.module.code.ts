import {
  landSound,
  type SoundDeps,
  soundDeps,
} from "akasha/infrastructure/inference/generation/audio/modules/sound-landing/sound-landing.module.code.ts"
import { shouldPersistMedia } from "akasha/infrastructure/inference/run/modules/persist-media/persist-media.module.code.ts"
import type { InferenceRunRecord } from "akasha/infrastructure/inference/run/modules/record/inference-run-record.module.code.ts"
import type { Value } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"

const AUDIO_OPERATIONS = new Set(["voice-design", "voice-clone", "music"])

const WRITER = "inference-cli <inference-cli@alanwalton.com>"

export function shouldPersistAudio(operation: string, persist: boolean | undefined): boolean {
  return shouldPersistMedia(operation, persist, AUDIO_OPERATIONS)
}

export function defaultPersistAudioDeps(): SoundDeps {
  return soundDeps(WRITER)
}

function soundValues(record: InferenceRunRecord): Value {
  return {
    title: record.title,
    service: record.service,
    operation: record.operation,
    model: record.model,
    ...(record.text !== undefined ? { text: record.text } : {}),
    ...(record.instruct !== undefined ? { instruct: record.instruct } : {}),
  }
}

export async function persistInferenceAudio(
  deps: SoundDeps,
  record: InferenceRunRecord,
  bytes: Uint8Array,
  done: string[]
): Promise<string> {
  const landed = await landSound(deps, bytes, soundValues(record), done)
  return landed.slug
}
