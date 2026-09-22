import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const mapPinsAchievementsId = {
  id: "01a06269-2a43-74b9-bf45-f2523005841a",
  type: "page-type/module",
  slug: "map-pins-achievements-id",
  definition: "the achievement id behind each achievement pin kind",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The table is the add-on's own source rather than a derivation.",
    },
  ],
} as const satisfies Module
