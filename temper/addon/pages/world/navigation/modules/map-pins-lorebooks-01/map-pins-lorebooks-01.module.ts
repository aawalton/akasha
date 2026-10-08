import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const mapPinsLorebooks01 = {
  id: "01a06269-2ad8-7fe8-b456-c065bcf3421b",
  type: "page-type/module",
  slug: "map-pins-lorebooks-01",
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
  createdAt: "2026-09-02T13:57:34.552Z",
  updatedAt: "2026-09-22T14:18:53.000Z",
} as const satisfies Module
