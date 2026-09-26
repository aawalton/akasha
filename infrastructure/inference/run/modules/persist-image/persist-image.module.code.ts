import {
  imagesNamedIn,
  makingValues,
} from "akasha/infrastructure/inference/generation/image/modules/making/image-making.module.code.ts"
import {
  type ImageDeps,
  imageDeps,
  landImage,
} from "akasha/infrastructure/inference/generation/image/modules/picture-landing/picture-landing.module.code.ts"
import { shouldPersistMedia } from "akasha/infrastructure/inference/run/modules/persist-media/persist-media.module.code.ts"
import type { InferenceRunRecord } from "akasha/infrastructure/inference/run/modules/record/inference-run-record.module.code.ts"

export const IMAGE_OPERATIONS: ReadonlySet<string> = new Set(["generate", "edit", "upscale"])

const WRITER = "inference-cli <inference-cli@alanwalton.com>"

export function shouldPersistImage(operation: string, persist: boolean | undefined): boolean {
  return shouldPersistMedia(operation, persist, IMAGE_OPERATIONS)
}

export function defaultPersistImageDeps(): ImageDeps {
  return imageDeps(WRITER)
}

async function heldAmong(deps: ImageDeps, slugs: readonly string[]): Promise<ReadonlySet<string>> {
  const held = new Set<string>()
  for (const slug of slugs) if ((await deps.pathOf(slug)) !== null) held.add(slug)
  return held
}

export async function persistInferenceImage(
  deps: ImageDeps,
  record: InferenceRunRecord,
  bytes: Uint8Array,
  done: string[]
): Promise<string> {
  const held = await heldAmong(deps, imagesNamedIn(record))
  const values = makingValues(record, (slug) => held.has(slug))
  const landed = await landImage(deps, bytes, values, done)
  return landed.slug
}
