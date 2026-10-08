import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const mapPinsTimeBreach = {
  id: "01a06269-2afa-7976-8774-81a443e86b6a",
  type: "page-type/module",
  slug: "map-pins-time-breach",
  definition: "the time breach places",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The table is the add-on's own source rather than a derivation.",
    },
  ],
  createdAt: "2026-09-02T13:57:34.586Z",
  updatedAt: "2026-09-22T02:18:28.000Z",
} as const satisfies Module
