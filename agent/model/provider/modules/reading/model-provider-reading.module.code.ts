import {
  listedAt,
  typeSlugOf,
} from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import type { Reading } from "akasha/page/index/modules/shape/index-shape.module.code.ts"
import { valueAt } from "akasha/page/modules/value/page-value.module.code.ts"
import type { Value } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"

const PROVIDER_TYPE = "01a0a20a-0678-73be-983a-777f3d76d8bb"

const NAMED = "model-provider/"

const API_BASE = "apiBase"

const PROVIDER_MODEL = "providerModel"

export function slugOf(provider: string): string {
  return provider.startsWith(NAMED) ? provider.slice(NAMED.length) : provider
}

export function providerPathIn(given: string | Reading, provider: string): string | null {
  return listedAt(given, typeSlugOf(given, PROVIDER_TYPE), slugOf(provider))[0]?.path ?? null
}

export function providerValuesIn(root: string, provider: string): Value | null {
  const page = providerPathIn(root, provider)
  return page === null ? null : valueAt(page, root)
}

export function apiBaseIn(root: string, provider: string): string | null {
  const said = providerValuesIn(root, provider)?.[API_BASE]
  return typeof said === "string" && said !== "" ? said : null
}

export function providerModelIn(root: string, provider: string): string | null {
  const said = providerValuesIn(root, provider)?.[PROVIDER_MODEL]
  return typeof said === "string" && said !== "" ? said : null
}
