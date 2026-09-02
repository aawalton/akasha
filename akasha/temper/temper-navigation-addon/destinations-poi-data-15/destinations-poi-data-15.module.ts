import type { Module } from "@akasha/code-system/module"

export const destinationsPoiData15 = {
  id: "01a06269-29d2-70c7-93e5-4d64ab7b5c10",
  pageTypeSlug: "module",
  slug: "destinations-poi-data-15",
  definition: "one run of the keeps, the points of interest by zone and the dungeon item sets",
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
