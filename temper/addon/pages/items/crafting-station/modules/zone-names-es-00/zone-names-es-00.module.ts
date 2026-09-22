import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const zoneNamesEs00 = {
  id: "01a061e7-930e-7fd2-8108-eed3bc2936c1",
  type: "page-type/module",
  slug: "zone-names-es-00",
  definition: "part 00 of every zone's name in es",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "These rows are the rows upstream LibZone v8.98 states.",
    },
  ],
} as const satisfies Module
