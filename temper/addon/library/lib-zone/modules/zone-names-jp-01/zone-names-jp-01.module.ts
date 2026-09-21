import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const zoneNamesJp01 = {
  id: "01a061e7-9318-7c30-ac9c-4fe18ab83797",
  type: "page-type/module",
  slug: "zone-names-jp-01",
  definition: "part 01 of every zone's name in jp",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "These rows are the rows upstream LibZone v8.98 states.",
    },
  ],
} as const satisfies Module
