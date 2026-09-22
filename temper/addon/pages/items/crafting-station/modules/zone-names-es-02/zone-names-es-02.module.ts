import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const zoneNamesEs02 = {
  id: "01a061e7-9310-75ab-98b9-8026f78c6f11",
  type: "page-type/module",
  slug: "zone-names-es-02",
  definition: "part 02 of every zone's name in es",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "These rows are the rows upstream LibZone v8.98 states.",
    },
  ],
} as const satisfies Module
