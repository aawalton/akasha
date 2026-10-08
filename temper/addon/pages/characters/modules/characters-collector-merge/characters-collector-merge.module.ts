import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const charactersCollectorMerge = {
  id: "01a062e9-b6fe-7010-ab1f-3d8afc6a9e8e",
  type: "page-type/module",
  slug: "characters-collector-merge",
  definition: "what a collector already stored joined with what it has just read",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "A collector never drops a value an earlier read stored and this read cannot see.",
    },
  ],
  createdAt: "2026-09-02T16:17:59.038Z",
  updatedAt: "2026-09-21T17:05:12.000Z",
} as const satisfies Module
