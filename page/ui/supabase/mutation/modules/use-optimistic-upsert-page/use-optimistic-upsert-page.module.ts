import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const useOptimisticUpsertPage = {
  id: "01a061cd-1a4e-7006-a646-42e7eaa25a21",
  type: "page-type/module",
  slug: "use-optimistic-upsert-page",
  definition:
    "Overlays a predicted upsert on a page in the local store, then runs the caller's upsert.",
  code: "ts",
} as const satisfies Module
