import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const housingPorting = {
  id: "01a06128-d5d1-7c25-8c9e-09001f10d091",
  type: "page-type/module",
  slug: "housing-porting",
  definition: "asking the game to travel to a house, inside or at the front door",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A port to another player's house needs that player to be a friend or guild mate.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Where a port lands is a player setting rather than a per-house choice.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A key bound to a favorite slot holding no house says so.",
    },
  ],
  createdAt: "2026-09-02T08:07:41.265Z",
  updatedAt: "2026-09-22T05:50:40.000Z",
} as const satisfies Module
