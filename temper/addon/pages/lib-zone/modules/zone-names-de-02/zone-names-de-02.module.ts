import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const zoneNamesDe02 = {
  id: "01a061e7-9307-7359-b95a-c4fa4eaabccc",
  type: "page-type/module",
  slug: "zone-names-de-02",
  definition: "part 02 of every zone's name in de",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "These rows are the rows upstream LibZone v8.98 states.",
    },
  ],
} as const satisfies Module
