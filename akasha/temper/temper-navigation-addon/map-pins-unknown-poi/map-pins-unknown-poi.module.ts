import type { Module } from "@akasha/code-system/module"

export const mapPinsUnknownPoi = {
  id: "01a06269-2b0b-7446-a5b0-f81ca022e64d",
  pageTypeSlug: "module",
  slug: "map-pins-unknown-poi",
  definition: "the points of interest by zone the map can show as unknown, joined from its runs",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The table is the runs joined in order.",
    },
  ],
} as const satisfies Module
