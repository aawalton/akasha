import type { Module } from "@akasha/code-system/module"

export const destinationsPoiData03 = {
  id: "01a06269-29c5-7974-9a34-243f889313ea",
  pageTypeSlug: "module",
  slug: "destinations-poi-data-03",
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
