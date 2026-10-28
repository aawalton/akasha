import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const leadsLocations = {
  id: "01a06274-b08a-7ce8-9f03-7001577750ae",
  type: "page-type/module",
  slug: "leads-locations",
  definition: "every antiquity's location hints, taken from the files with them",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The lead table is written by `akasha temper upstream data-port lead-list`.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No row of the lead table is written by hand.",
    },
  ],
  createdAt: "2026-09-02T14:10:09.674Z",
  updatedAt: "2026-10-28T16:49:50.742Z",
} as const satisfies Module
