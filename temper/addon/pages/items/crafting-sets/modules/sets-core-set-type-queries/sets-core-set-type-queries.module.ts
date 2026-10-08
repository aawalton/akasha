import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const setsCoreSetTypeQueries = {
  id: "01a061fc-ceec-7138-838e-448841d39974",
  type: "page-type/module",
  slug: "sets-core-set-type-queries",
  definition: "the sets of a type, and the drop mechanic names a set carries in each language",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The world map opener is published from this module rather than from navigation.",
    },
  ],
  createdAt: "2026-09-02T11:59:13.132Z",
  updatedAt: "2026-09-22T10:07:46.000Z",
} as const satisfies Module
