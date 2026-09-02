import type { Module } from "@akasha/code-system/module"

export const mapPinsLorebooks02 = {
  id: "01a06269-2ad9-7efa-a7b1-f6ec6acf7fe7",
  pageTypeSlug: "module",
  slug: "map-pins-lorebooks-02",
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
