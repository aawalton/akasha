import type { Module } from "@akasha/code-system/module"

export const mapPinsUnknownPoi02 = {
  id: "01a06269-2b05-707e-aeb5-4172c9b6cacb",
  pageTypeSlug: "module",
  slug: "map-pins-unknown-poi-02",
  definition: "one run of the points of interest by zone the map can show as unknown",
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
