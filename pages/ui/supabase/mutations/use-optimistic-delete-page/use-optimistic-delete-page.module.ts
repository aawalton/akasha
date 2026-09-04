import type { Module } from "@akasha/code-system/module"

export const useOptimisticDeletePage = {
  id: "01a061cd-1a4e-7001-91a9-cadd11dd8753",
  pageTypeSlug: "module",
  slug: "use-optimistic-delete-page",
  definition:
    "Takes one predicted page out of the local store, then runs the delete the caller handed in.",
  code: "ts",
} as const satisfies Module
