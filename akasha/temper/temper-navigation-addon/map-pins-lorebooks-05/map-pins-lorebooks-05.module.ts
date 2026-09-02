import type { Module } from "@akasha/code-system/module"

export const mapPinsLorebooks05 = {
  id: "01a06269-2adc-78ba-a34b-55119de08bea",
  pageTypeSlug: "module",
  slug: "map-pins-lorebooks-05",
  definition: "one run of the lore book pin places by zone",
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
