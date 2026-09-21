import {
  type ImageDeps,
  imageDeps,
  landImage,
} from "akasha/infrastructure/inference/generation/image/modules/picture-landing/picture-landing.module.code.ts"
import { shouldPersistMedia } from "akasha/infrastructure/inference/run/modules/persist-media/persist-media.module.code.ts"

const IMAGE_OPERATIONS = new Set(["generate", "edit", "upscale"])

const WRITER = "inference-cli <inference-cli@alanwalton.com>"

export function shouldPersistImage(operation: string, persist: boolean | undefined): boolean {
  return shouldPersistMedia(operation, persist, IMAGE_OPERATIONS)
}

export function defaultPersistImageDeps(): ImageDeps {
  return imageDeps(WRITER)
}

export async function persistInferenceImage(
  deps: ImageDeps,
  bytes: Uint8Array,
  done: string[]
): Promise<string> {
  const landed = await landImage(deps, bytes, {}, done)
  return landed.slug
}
