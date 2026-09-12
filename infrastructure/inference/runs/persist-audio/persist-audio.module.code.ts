import { OperationalError } from "akasha/alan/harness/errors-core/exit-code/exit-code.module.code.ts"
import { landRow } from "akasha/infrastructure/inference/runs/generation-log/generation-log.module.code.ts"
import {
  persistInferenceMedia,
  shouldPersistMedia,
} from "akasha/infrastructure/inference/runs/persist-media/persist-media.module.code.ts"
import type { InferenceRunRecord } from "akasha/infrastructure/inference/runs/record/inference-run-record.module.code.ts"
import { audioObjectKey } from "akasha/infrastructure/storage/object-store/key/object-store-key.module.code.ts"
import { seaweedFSObjectStoreFromEnv } from "akasha/infrastructure/storage/object-store/seaweedfs-store/seaweedfs-store.module.code.ts"
import type { Json } from "akasha/utils/narrow/json-value/json-value.module.code.ts"

const AUDIO_PAGE_TYPE_SLUG = "audio"

const AUDIO_OPERATIONS = new Set(["voice-design", "voice-clone", "music"])

function deriveAudioEngine(service: string, operation: string): string {
  if (operation === "music") return "ace-step"
  return service
}

export function shouldPersistAudio(operation: string, persist: boolean | undefined): boolean {
  return shouldPersistMedia(operation, persist, AUDIO_OPERATIONS)
}

export interface AudioPersistInput {
  readonly record: InferenceRunRecord
  readonly inferenceRunId: string
  readonly outputPath: string
}

function buildAudioPageProperties(input: AudioPersistInput): Record<string, Json> {
  const { record, inferenceRunId, outputPath } = input
  return {
    title: record.title,
    engine: deriveAudioEngine(record.service, record.operation),
    service: record.service,
    operation: record.operation,
    model: record.model,
    ...(record.prompt !== undefined ? { prompt: record.prompt } : {}),
    ...(record.seed !== undefined ? { seed: record.seed } : {}),
    ...(record.instruct !== undefined ? { instruct: record.instruct } : {}),
    ...(record.text !== undefined ? { text: record.text } : {}),
    ...(record.duration !== undefined ? { durationSeconds: record.duration } : {}),
    audioPath: outputPath,
    inferenceRun: inferenceRunId,
  }
}

export interface PersistAudioDeps {
  readonly createAudioPage: (properties: Record<string, Json>) => Promise<string>
  readonly publishAudio: (pageId: string, bytes: Uint8Array) => Promise<void>
}

function putSaid(pageId: string): string {
  return `put ${pageId}'s bytes at ${audioObjectKey(pageId)} in the object store`
}

export function defaultPersistAudioDeps(done: string[]): PersistAudioDeps {
  return {
    createAudioPage: async (properties) => landRow(AUDIO_PAGE_TYPE_SLUG, properties),
    publishAudio: async (pageId, bytes) => {
      const store = seaweedFSObjectStoreFromEnv()
      if (store === null) {
        throw new OperationalError(
          "object store not configured — set SEAWEEDFS_S3_ENDPOINT / SEAWEEDFS_BUCKET / SEAWEEDFS_ACCESS_KEY / SEAWEEDFS_SECRET_KEY"
        )
      }
      await store.put(audioObjectKey(pageId), new Uint8Array(bytes))
      done.push(putSaid(pageId))
    },
  }
}

export async function persistInferenceAudio(
  deps: PersistAudioDeps,
  input: AudioPersistInput & { readonly outputBytes: Uint8Array },
  done: string[]
): Promise<string> {
  return persistInferenceMedia(
    { createPage: deps.createAudioPage, publishBytes: deps.publishAudio },
    { properties: buildAudioPageProperties(input), outputBytes: input.outputBytes },
    done
  )
}
