import type { Module } from "@akasha/code-system/module"

export const mapPinsAchievements00 = {
  id: "01a06269-2a3e-7d9b-b30d-157dbaab010f",
  pageTypeSlug: "module",
  slug: "map-pins-achievements-00",
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
