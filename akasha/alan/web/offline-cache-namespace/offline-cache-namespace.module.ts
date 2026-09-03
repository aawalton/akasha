import type { Module } from "@akasha/code-system/module"

export const offlineCacheNamespace = {
  id: "01a0655d-daab-70a8-aa8c-abca4e99c9fe",
  pageTypeSlug: "module",
  slug: "offline-cache-namespace",
  definition: "the key an offline cache is held under, one reader to a key",
  code: "ts",
} as const satisfies Module
