import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const zoneNamesFr01 = {
  id: "01a061e7-9314-77c9-9f3f-d636d61d9fda",
  type: "page-type/module",
  slug: "zone-names-fr-01",
  definition: "part 01 of every zone's name in fr",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "These rows are the rows upstream LibZone v8.98 states.",
    },
  ],
  createdAt: "2026-09-02T11:36:01.556Z",
  updatedAt: "2026-09-22T03:24:53.000Z",
} as const satisfies Module
