import type { Module } from "@akasha/code-system/module"

export const mapPinsPrecursorItems = {
  id: "01a06269-2ae5-7f79-8e4b-0756b0c7dbb6",
  pageTypeSlug: "module",
  slug: "map-pins-precursor-items",
  definition: "the precursor part places",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The table is the add-on's own source rather than a derivation.",
    },
  ],
} as const satisfies Module
