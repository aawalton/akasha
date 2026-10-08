import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const useOptimisticDeletePages = {
  id: "01a061cd-1a4e-7002-befa-7c8f8ff562fe",
  type: "page-type/module",
  slug: "use-optimistic-delete-pages",
  definition:
    "Takes the predicted pages out of the local store, then runs the delete the caller handed in.",
  code: "ts",
  createdAt: "2026-09-02T11:07:06.702Z",
  updatedAt: "2026-09-15T18:37:21.000Z",
} as const satisfies Module
