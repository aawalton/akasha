import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const mapPinsRelicsOfSummerset = {
  id: "01a06269-2ae8-712d-a015-38014478c2d9",
  type: "page-type/module",
  slug: "map-pins-relics-of-summerset",
  definition: "the Summerset relic places",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The table is the add-on's own source rather than a derivation.",
    },
  ],
  createdAt: "2026-09-02T13:57:34.568Z",
  updatedAt: "2026-09-22T02:18:28.000Z",
} as const satisfies Module
