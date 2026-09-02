import type { Module } from "@akasha/code-system/module"

export const mapPinsAchievements02 = {
  id: "01a06269-2a40-7f6a-bf64-5c964f6706e3",
  pageTypeSlug: "module",
  slug: "map-pins-achievements-02",
  definition: "one run of the achievement pin places by zone",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "The records here are one unbroken run of the table's order.",
    },
    {
      invariantKind: "departure",
      statement: "The run is the add-on's own source rather than a derivation.",
    },
  ],
} as const satisfies Module
