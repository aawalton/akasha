import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const mapPinsFishingAchievements = {
  id: "01a06269-2aab-7282-8596-c76fba78efef",
  type: "page-type/module",
  slug: "map-pins-fishing-achievements",
  definition: "the achievement behind each fishing zone",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The table is the add-on's own source rather than a derivation.",
    },
  ],
  createdAt: "2026-09-02T13:57:34.507Z",
  updatedAt: "2026-09-22T02:18:28.000Z",
} as const satisfies Module
