import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const mapPinsSkyShardsAchievements = {
  id: "01a06269-2aec-7823-a9a9-301dd5bf6066",
  type: "page-type/module",
  slug: "map-pins-sky-shards-achievements",
  definition: "the achievement behind each zone's skyshards",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The table is the add-on's own source rather than a derivation.",
    },
  ],
} as const satisfies Module
