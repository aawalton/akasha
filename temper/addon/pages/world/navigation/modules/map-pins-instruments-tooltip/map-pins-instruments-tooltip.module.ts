import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const mapPinsInstrumentsTooltip = {
  id: "01a06269-2acc-729c-abb2-9a82ae72abfe",
  type: "page-type/module",
  slug: "map-pins-instruments-tooltip",
  definition: "the tooltip of each instrument",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The table is the add-on's own source rather than a derivation.",
    },
  ],
  createdAt: "2026-09-02T13:57:34.540Z",
  updatedAt: "2026-09-22T02:18:28.000Z",
} as const satisfies Module
