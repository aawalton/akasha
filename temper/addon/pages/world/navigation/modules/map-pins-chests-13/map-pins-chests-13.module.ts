import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const mapPinsChests13 = {
  id: "01a06269-2a92-7da0-b853-c6ba81d0745f",
  type: "page-type/module",
  slug: "map-pins-chests-13",
  definition: "a set of the treasure chest places by zone",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "The records here are one unbroken run of the table's order.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The set is the add-on's own source rather than a derivation.",
    },
  ],
  createdAt: "2026-09-02T13:57:34.482Z",
  updatedAt: "2026-09-22T14:18:53.000Z",
} as const satisfies Module
