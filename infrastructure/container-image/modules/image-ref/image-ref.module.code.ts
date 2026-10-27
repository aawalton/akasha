import { ROOT } from "akasha/infrastructure/container-image/dockerfile/modules/services/dockerfile-services.module.code.ts"
import {
  buildOf,
  everyNamed,
} from "akasha/infrastructure/container-image/modules/image-build/image-build.module.code.ts"
import { inputsFor } from "akasha/infrastructure/container-image/modules/image-inputs/image-inputs.module.code.ts"

export const REGISTRY = "registry.registry.svc.cluster.local:5000"

export const CACHE_TAG = "buildcache"

export const SOURCE_PLACEHOLDER = "IMAGE_SOURCE"

export function refFor(repository: string, tag: string): string {
  return `${REGISTRY}/${repository}:${tag}`
}

export function refOf(page: { readonly slug: string }): string {
  const build = buildOf(page.slug)
  return refFor(build.repository, inputsFor(build).hash)
}

export function sourcedRef(repository: string): string {
  return refFor(repository, SOURCE_PLACEHOLDER)
}

export function withSources(yaml: string, codeAt: string = ROOT): string {
  let held = yaml
  for (const named of everyNamed()) {
    const placeholder = sourcedRef(named.repository)
    if (!held.includes(placeholder)) continue
    const tag = inputsFor(buildOf(named.slug, codeAt), codeAt).hash
    held = held.replaceAll(placeholder, refFor(named.repository, tag))
  }
  return held
}
