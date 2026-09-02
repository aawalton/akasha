import type { Module } from "@akasha/code-system/module"

export const mapPinsAchievements03 = {
  id: "01a06269-2a41-7c4a-b999-5080597bc1ce",
  pageTypeSlug: "module",
  slug: "map-pins-achievements-03",
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
