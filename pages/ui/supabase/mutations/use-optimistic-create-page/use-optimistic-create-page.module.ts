import type { Module } from "@akasha/code-system/module"

export const useOptimisticCreatePage = {
  id: "01a061cd-1a4e-7000-96b1-be78648de486",
  pageTypeSlug: "module",
  slug: "use-optimistic-create-page",
  definition:
    "Puts a predicted new page into the local store, then runs the create the caller handed in.",
  code: "ts",
} as const satisfies Module
