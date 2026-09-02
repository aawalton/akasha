import type { Module } from "@akasha/code-system/module"

export const mapPinsChests21 = {
  id: "01a06269-2a9b-79f8-8d2f-0ba62989ea61",
  pageTypeSlug: "module",
  slug: "map-pins-chests-21",
  definition: "one run of the treasure chest places by zone",
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
