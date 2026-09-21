import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const zoneNamesFr03 = {
  id: "01a061e7-9316-7fc0-b363-bec494165697",
  type: "page-type/module",
  slug: "zone-names-fr-03",
  definition: "part 03 of every zone's name in fr",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "These rows are the rows upstream LibZone v8.98 states.",
    },
  ],
} as const satisfies Module
