import type { Module } from "@akasha/code-system/module"

export const mapPinsChests26 = {
  id: "01a06269-2aa0-786f-9496-98e68dda8c08",
  pageTypeSlug: "module",
  slug: "map-pins-chests-26",
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
