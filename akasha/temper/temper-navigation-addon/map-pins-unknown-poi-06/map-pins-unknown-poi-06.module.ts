import type { Module } from "@akasha/code-system/module"

export const mapPinsUnknownPoi06 = {
  id: "01a06269-2b0a-724e-9c85-f4d096833121",
  pageTypeSlug: "module",
  slug: "map-pins-unknown-poi-06",
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
