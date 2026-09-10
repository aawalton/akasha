import type { BuiltImage } from "../dockerfiles/built-images/built-image.page-type.types.ts"
import { inputsFor } from "../image-inputs/image-inputs.module.code.ts"

export const REGISTRY = "registry.registry.svc.cluster.local:5000"

export const CACHE_TAG = "buildcache"

export function refFor(repository: string, tag: string): string {
  return `${REGISTRY}/${repository}:${tag}`
}

export function repositoryOf(image: BuiltImage): string {
  const held = image.repository
  if (held === undefined) {
    throw new Error(`${image.slug} states no repository, so nothing says where to push it`)
  }
  return held
}

export function refOf(image: BuiltImage): string {
  return refFor(repositoryOf(image), inputsFor(image.slug).hash)
}
