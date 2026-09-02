import type { Module } from "@akasha/code-system/module"

export const mapPinsChests24 = {
  id: "01a06269-2a9e-7248-a0f3-18d8082e4504",
  pageTypeSlug: "module",
  slug: "map-pins-chests-24",
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
