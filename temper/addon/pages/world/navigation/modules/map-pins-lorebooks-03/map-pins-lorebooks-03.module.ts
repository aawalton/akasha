import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const mapPinsLorebooks03 = {
  id: "01a06269-2ada-7075-b251-a976817ab318",
  type: "page-type/module",
  slug: "map-pins-lorebooks-03",
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
} as const satisfies Module
