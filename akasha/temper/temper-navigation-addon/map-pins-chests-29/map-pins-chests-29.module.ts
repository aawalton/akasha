import type { Module } from "@akasha/code-system/module"

export const mapPinsChests29 = {
  id: "01a06269-2aa4-79a7-86e2-9c757c441371",
  pageTypeSlug: "module",
  slug: "map-pins-chests-29",
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
