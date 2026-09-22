import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const mapPinsBossesAchievements = {
  id: "01a06269-2a46-7e88-85de-57a6723d98a1",
  type: "page-type/module",
  slug: "map-pins-bosses-achievements",
  definition: "the achievement behind each world boss",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The table is the add-on's own source rather than a derivation.",
    },
  ],
} as const satisfies Module
