import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const mapPinsPrecursorTooltip = {
  id: "01a06269-2ae6-7296-a8b5-f9f9d9ab737a",
  type: "page-type/module",
  slug: "map-pins-precursor-tooltip",
  definition: "the tooltip of each precursor part",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The table is the add-on's own source rather than a derivation.",
    },
  ],
} as const satisfies Module
