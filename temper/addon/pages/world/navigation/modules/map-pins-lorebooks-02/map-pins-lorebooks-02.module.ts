import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const mapPinsLorebooks02 = {
  id: "01a06269-2ad9-7efa-a7b1-f6ec6acf7fe7",
  type: "page-type/module",
  slug: "map-pins-lorebooks-02",
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
  createdAt: "2026-09-02T13:57:34.553Z",
  updatedAt: "2026-09-22T14:17:51.000Z",
} as const satisfies Module
