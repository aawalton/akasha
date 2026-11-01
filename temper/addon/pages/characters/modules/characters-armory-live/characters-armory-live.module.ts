import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const charactersArmoryLive = {
  id: "01a198da-8335-7168-abeb-80394857526b",
  type: "page-type/module",
  slug: "characters-armory-live",
  definition: "what a build saved in the game's Temper Armory shows before it is read back",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A saved build shows the attributes, bars, stars, gear, quickslots and curse as saved.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A saved build keeps the passives, mundus and food of the build it was saved over.",
    },
  ],
  createdAt: "2026-11-01T20:43:39.700Z",
  updatedAt: "2026-11-01T22:42:23.147Z",
} as const satisfies Module
