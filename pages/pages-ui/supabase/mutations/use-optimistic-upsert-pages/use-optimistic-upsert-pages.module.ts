import type { Module } from "@akasha/code-system/module"

export const useOptimisticUpsertPages = {
  id: "01a061cd-1a4e-7007-bdcd-9737ecb8ffd8",
  pageTypeSlug: "module",
  slug: "use-optimistic-upsert-pages",
  definition:
    "Overlays a predicted upsert per item, then runs the caller's upsert for every item at once.",
  code: "ts",
} as const satisfies Module
