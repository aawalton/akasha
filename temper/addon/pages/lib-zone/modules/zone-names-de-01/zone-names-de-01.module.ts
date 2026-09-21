import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const zoneNamesDe01 = {
  id: "01a061e7-9306-7587-b4d0-0d0f7f9ff42a",
  type: "page-type/module",
  slug: "zone-names-de-01",
  definition: "part 01 of every zone's name in de",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "These rows are the rows upstream LibZone v8.98 states.",
    },
  ],
} as const satisfies Module
