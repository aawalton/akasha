import type { Module } from "@akasha/code-system/module"

export const housingPorting = {
  id: "01a06128-d5d1-7c25-8c9e-09001f10d091",
  pageTypeSlug: "module",
  slug: "housing-porting",
  definition: "asking the game to travel to a house, inside or at the front door",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A port to another player's house needs that player to be a friend or guild mate.",
    },
    {
      invariantKind: "departure",
      statement: "Where a port lands is a player setting rather than a per-house choice.",
    },
  ],
} as const satisfies Module
