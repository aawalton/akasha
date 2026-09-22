import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const zoneNamesDe00 = {
  id: "01a061e7-9305-7231-96d3-35f40793a52e",
  type: "page-type/module",
  slug: "zone-names-de-00",
  definition: "part 00 of every zone's name in de",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "These rows are the rows upstream LibZone v8.98 states.",
    },
  ],
} as const satisfies Module
