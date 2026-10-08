import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const leadsZones = {
  id: "01a06274-b08a-7704-bb73-1995a9337535",
  type: "page-type/module",
  slug: "leads-zones",
  definition: "the zones a lead is grouped under, the game's own and the invented ones",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An invented zone id sits above the highest id the game itself uses.",
    },
  ],
  createdAt: "2026-09-02T14:10:09.674Z",
  updatedAt: "2026-09-22T02:33:54.000Z",
} as const satisfies Module
