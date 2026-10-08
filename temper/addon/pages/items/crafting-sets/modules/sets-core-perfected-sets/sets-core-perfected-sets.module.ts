import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const setsCorePerfectedSets = {
  id: "01a061fc-ceeb-71fc-bced-c9b4d1f3537a",
  type: "page-type/module",
  slug: "sets-core-perfected-sets",
  definition: "which set is the perfected twin of which, and the drop zone of each of the pair",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "A pair is only recorded when both set ids and both zone ids are known.",
    },
  ],
  createdAt: "2026-09-02T11:59:13.131Z",
  updatedAt: "2026-09-22T14:04:10.000Z",
} as const satisfies Module
