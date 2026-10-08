import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const zoneNamesEn02 = {
  id: "01a061e7-930c-7af6-af4b-9bfbd7d6acf6",
  type: "page-type/module",
  slug: "zone-names-en-02",
  definition: "part 02 of every zone's name in en",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "These rows are the rows upstream LibZone v8.98 states.",
    },
  ],
  createdAt: "2026-09-02T11:36:01.548Z",
  updatedAt: "2026-09-22T03:24:53.000Z",
} as const satisfies Module
