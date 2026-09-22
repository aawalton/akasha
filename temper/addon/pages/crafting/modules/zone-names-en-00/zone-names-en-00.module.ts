import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const zoneNamesEn00 = {
  id: "01a061e7-930a-7ecd-9de2-583e0cd3780b",
  type: "page-type/module",
  slug: "zone-names-en-00",
  definition: "part 00 of every zone's name in en",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "These rows are the rows upstream LibZone v8.98 states.",
    },
  ],
} as const satisfies Module
