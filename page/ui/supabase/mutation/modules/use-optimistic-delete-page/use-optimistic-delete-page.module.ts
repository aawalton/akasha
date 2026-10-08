import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const useOptimisticDeletePage = {
  id: "01a061cd-1a4e-7001-91a9-cadd11dd8753",
  type: "page-type/module",
  slug: "use-optimistic-delete-page",
  definition:
    "Takes a predicted page out of the local store, then runs the delete the caller handed in.",
  code: "ts",
  createdAt: "2026-09-02T11:07:06.702Z",
  updatedAt: "2026-09-22T10:07:59.000Z",
} as const satisfies Module
