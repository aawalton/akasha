import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const mapPinsPrecursorItems = {
  id: "01a06269-2ae5-7f79-8e4b-0756b0c7dbb6",
  type: "page-type/module",
  slug: "map-pins-precursor-items",
  definition: "the precursor part places",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The table is the add-on's own source rather than a derivation.",
    },
  ],
} as const satisfies Module
