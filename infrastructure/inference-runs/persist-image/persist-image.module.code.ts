import { OperationalError } from "@akasha/errors-core/exit-code"
import { imageObjectKey } from "@akasha/object-store/object-store-key"
import { seaweedFSObjectStoreFromEnv } from "@akasha/object-store/seaweedfs-store"
import { coverUrl } from "@akasha/pages-url/cover-url"
import type { Json } from "@akasha/utils-narrow/json-value"
import { landRow, mergeRow } from "../generation-log/generation-log.module.code.ts"
import type { InferenceRunRecord } from "../inference-run-record/inference-run-record.module.code.ts"
import {
  persistInferenceMedia,
  shouldPersistMedia,
} from "../persist-media/persist-media.module.code.ts"

export const IMAGE_PAGE_TYPE_SLUG = "image"

const IMAGE_OPERATIONS = new Set(["generate", "edit", "upscale"])

export function deriveEngine(service: string, operation: string): string {
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

export function buildImagePageProperties(input: ImagePersistInput): Record<string, Json> {
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

export function defaultPersistImageDeps(): PersistImageDeps {
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
      await mergeRow(IMAGE_PAGE_TYPE_SLUG, pageId, { cover: coverUrl(pageId) })
    },
  }
}

export async function persistInferenceImage(
  deps: PersistImageDeps,
  input: ImagePersistInput & { readonly outputBytes: Uint8Array }
): Promise<string> {
  return persistInferenceMedia(
    { createPage: deps.createImagePage, publishBytes: deps.publishCover },
    { properties: buildImagePageProperties(input), outputBytes: input.outputBytes }
  )
}
