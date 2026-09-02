import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const dungeonChampionPins = {
  id: "01a060f9-bacd-7dc6-a95a-c3fb8f7ff2c5",
  pageTypeSlug: "module",
  slug: "dungeon-champion-pins",
  definition: "drawing a champion on the map and on the compass, and the tooltip it carries",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Pins asked for before the player is in the world wait for the world.",
    },
    {
      invariantKind: "constraint",
      statement: "A champion draws as killed only where the game says the criterion is met.",
    },
  ],
} as const satisfies Module
