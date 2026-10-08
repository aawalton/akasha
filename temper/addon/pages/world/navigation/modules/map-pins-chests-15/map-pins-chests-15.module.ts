import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const mapPinsChests15 = {
  id: "01a06269-2a94-75fe-996d-a82eb7166bf9",
  type: "page-type/module",
  slug: "map-pins-chests-15",
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
  createdAt: "2026-09-02T13:57:34.484Z",
  updatedAt: "2026-09-22T14:19:07.000Z",
} as const satisfies Module
