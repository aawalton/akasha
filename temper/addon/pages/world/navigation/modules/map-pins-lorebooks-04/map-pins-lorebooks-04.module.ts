import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const mapPinsLorebooks04 = {
  id: "01a06269-2adb-7af5-b2e4-639376ce4554",
  type: "page-type/module",
  slug: "map-pins-lorebooks-04",
  definition: "a run of the lore book pin places by zone",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "The records here are one unbroken run of the table's order.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The run is the add-on's own source rather than a derivation.",
    },
  ],
} as const satisfies Module
