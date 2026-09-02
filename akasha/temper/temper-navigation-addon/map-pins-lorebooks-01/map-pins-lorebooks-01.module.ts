import type { Module } from "@akasha/code-system/module"

export const mapPinsLorebooks01 = {
  id: "01a06269-2ad8-7fe8-b456-c065bcf3421b",
  pageTypeSlug: "module",
  slug: "map-pins-lorebooks-01",
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
