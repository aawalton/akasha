import type { Module } from "@akasha/code-system/module"

export const mapPinsLorebooks04 = {
  id: "01a06269-2adb-7af5-b2e4-639376ce4554",
  pageTypeSlug: "module",
  slug: "map-pins-lorebooks-04",
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
