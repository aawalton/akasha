import type { Module } from "@akasha/code-system/module"

export const mapPinsFishingNodes07 = {
  id: "01a06269-2ac4-7335-8a50-69623e4bd6f6",
  pageTypeSlug: "module",
  slug: "map-pins-fishing-nodes-07",
  definition: "one run of the fishing hole places by zone",
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
