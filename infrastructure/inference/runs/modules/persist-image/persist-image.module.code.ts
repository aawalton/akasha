import { OperationalError } from "akasha/alan/harness/errors-core/exit-code/exit-code.module.code.ts"
import {
  landRow,
  mergeRow,
} from "akasha/infrastructure/inference/runs/modules/generation-log/generation-log.module.code.ts"
import {
  persistInferenceMedia,
  shouldPersistMedia,
} from "akasha/infrastructure/inference/runs/modules/persist-media/persist-media.module.code.ts"
import type { InferenceRunRecord } from "akasha/infrastructure/inference/runs/record/inference-run-record.module.code.ts"
import { imageObjectKey } from "akasha/infrastructure/storage/object-store/key/object-store-key.module.code.ts"
import { seaweedFSObjectStoreFromEnv } from "akasha/infrastructure/storage/object-store/seaweedfs-store/seaweedfs-store.module.code.ts"
import { coverUrl } from "akasha/pages/url/modules/cover-url/cover-url.module.code.ts"
import type { Json } from "akasha/utils/narrow/json-value/json-value.module.code.ts"

const IMAGE_PAGE_TYPE_SLUG = "image"

const IMAGE_OPERATIONS = new Set(["generate", "edit", "upscale"])

function deriveEngine(service: string, operation: string): string {
  if (operation === "edit") return "nano-banana"
  if (operation === "upscale") return "seedvr2"
  if (service.startsWith("image-gen")) return "z-image"
  return service
}

export function shouldPersistImage(operation: string, persist: boolean | undefined): boolean {
  return shouldPersistMedia(operation, persist, IMAGE_OPERATIONS)
}

export interface ImagePersistInput {
  readonly record: InferenceRunRecord
  readonly inferenceRunId: string
  readonly outputPath: string
}

function buildImagePageProperties(input: ImagePersistInput): Record<string, Json> {
  const { record, inferenceRunId, outputPath } = input
  return {
    title: record.title,
    engine: deriveEngine(record.service, record.operation),
    service: record.service,
    operation: record.operation,
    model: record.model,
    ...(record.prompt !== undefined ? { prompt: record.prompt } : {}),
    ...(record.seed !== undefined ? { seed: record.seed } : {}),
    imagePath: outputPath,
    inferenceRun: inferenceRunId,
  }
}

export interface PersistImageDeps {
  readonly createImagePage: (properties: Record<string, Json>) => Promise<string>
  readonly publishCover: (pageId: string, bytes: Uint8Array) => Promise<void>
}

function putSaid(pageId: string): string {
  return `put ${pageId}'s bytes at ${imageObjectKey(pageId)} in the object store`
}

function coveredSaid(pageId: string): string {
  return `set the cover of ${pageId} to ${coverUrl(pageId)}`
}

export function defaultPersistImageDeps(done: string[]): PersistImageDeps {
  return {
    createImagePage: async (properties) => landRow(IMAGE_PAGE_TYPE_SLUG, properties),
    publishCover: async (pageId, bytes) => {
      const store = seaweedFSObjectStoreFromEnv()
      if (store === null) {
        throw new OperationalError(
          "object store not configured — set SEAWEEDFS_S3_ENDPOINT / SEAWEEDFS_BUCKET / SEAWEEDFS_ACCESS_KEY / SEAWEEDFS_SECRET_KEY"
        )
      }
      await store.put(imageObjectKey(pageId), new Uint8Array(bytes))
      done.push(putSaid(pageId))
      await mergeRow(IMAGE_PAGE_TYPE_SLUG, pageId, { cover: coverUrl(pageId) })
      done.push(coveredSaid(pageId))
    },
  }
}

export async function persistInferenceImage(
  deps: PersistImageDeps,
  input: ImagePersistInput & { readonly outputBytes: Uint8Array },
  done: string[]
): Promise<string> {
  return persistInferenceMedia(
    { createPage: deps.createImagePage, publishBytes: deps.publishCover },
    { properties: buildImagePageProperties(input), outputBytes: input.outputBytes },
    done
  )
}
