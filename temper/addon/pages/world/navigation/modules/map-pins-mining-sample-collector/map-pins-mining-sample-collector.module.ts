import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const mapPinsMiningSampleCollector = {
  id: "01a06269-2ae0-75f4-935b-2a36a666b617",
  type: "page-type/module",
  slug: "map-pins-mining-sample-collector",
  definition: "the mining sample places",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The table is the add-on's own source rather than a derivation.",
    },
  ],
  createdAt: "2026-09-02T13:57:34.560Z",
  updatedAt: "2026-09-22T02:18:28.000Z",
} as const satisfies Module
