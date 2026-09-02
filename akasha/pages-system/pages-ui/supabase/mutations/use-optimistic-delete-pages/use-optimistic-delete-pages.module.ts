import type { Module } from "@akasha/code-system/module"

export const useOptimisticDeletePages = {
  id: "01a061cd-1a4e-7002-befa-7c8f8ff562fe",
  pageTypeSlug: "module",
  slug: "use-optimistic-delete-pages",
  definition:
    "Takes the predicted pages out of the local store, then runs the delete the caller handed in.",
  code: "ts",
} as const satisfies Module
