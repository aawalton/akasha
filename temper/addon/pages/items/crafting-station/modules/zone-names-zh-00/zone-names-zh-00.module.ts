import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const zoneNamesZh00 = {
  id: "01a061e7-9325-732f-9717-e520a16841fd",
  type: "page-type/module",
  slug: "zone-names-zh-00",
  definition: "part 00 of every zone's name in zh",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "These rows are the rows upstream LibZone v8.98 states.",
    },
  ],
  createdAt: "2026-09-02T11:36:01.573Z",
  updatedAt: "2026-09-22T03:24:53.000Z",
} as const satisfies Module
