import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const zoneNamesEn01 = {
  id: "01a061e7-930b-7425-b850-51ba9661e261",
  type: "page-type/module",
  slug: "zone-names-en-01",
  definition: "part 01 of every zone's name in en",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "These rows are the rows upstream LibZone v8.98 states.",
    },
  ],
  createdAt: "2026-09-02T11:36:01.547Z",
  updatedAt: "2026-09-22T03:24:53.000Z",
} as const satisfies Module
