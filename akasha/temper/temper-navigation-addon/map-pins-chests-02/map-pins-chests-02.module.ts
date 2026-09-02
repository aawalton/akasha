import type { Module } from "@akasha/code-system/module"

export const mapPinsChests02 = {
  id: "01a06269-2a86-7feb-a513-57669077c7fa",
  pageTypeSlug: "module",
  slug: "map-pins-chests-02",
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
