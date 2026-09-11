import { buildOf } from "akasha/infrastructure/container-image/image-build/image-build.module.code.ts"
import { inputsFor } from "akasha/infrastructure/container-image/image-inputs/image-inputs.module.code.ts"

export const REGISTRY = "registry.registry.svc.cluster.local:5000"

export const CACHE_TAG = "buildcache"

export function refFor(repository: string, tag: string): string {
  return `${REGISTRY}/${repository}:${tag}`
}

export function refOf(page: { readonly slug: string }): string {
  const build = buildOf(page.slug)
  return refFor(build.repository, inputsFor(build).hash)
}
