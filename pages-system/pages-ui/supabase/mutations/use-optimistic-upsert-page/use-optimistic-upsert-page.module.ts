import type { Module } from "@akasha/code-system/module"

export const useOptimisticUpsertPage = {
  id: "01a061cd-1a4e-7006-a646-42e7eaa25a21",
  pageTypeSlug: "module",
  slug: "use-optimistic-upsert-page",
  definition:
    "Overlays a predicted upsert on one page in the local store, then runs the caller's upsert.",
  code: "ts",
} as const satisfies Module
