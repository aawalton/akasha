import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const zoneNamesZh01 = {
  id: "01a061e7-9326-718e-b42c-99bc9f7896d5",
  type: "page-type/module",
  slug: "zone-names-zh-01",
  definition: "part 01 of every zone's name in zh",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "These rows are the rows upstream LibZone v8.98 states.",
    },
  ],
} as const satisfies Module
