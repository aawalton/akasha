import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const mapPinsLorebooks05 = {
  id: "01a06269-2adc-78ba-a34b-55119de08bea",
  type: "page-type/module",
  slug: "map-pins-lorebooks-05",
  definition: "a set of the lore book pin places by zone",
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
  createdAt: "2026-09-02T13:57:34.556Z",
  updatedAt: "2026-09-22T14:15:16.000Z",
} as const satisfies Module
