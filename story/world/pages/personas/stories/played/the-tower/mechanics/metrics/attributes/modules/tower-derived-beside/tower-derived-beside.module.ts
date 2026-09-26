import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const towerDerivedBeside = {
  id: "01a0de52-84f3-78f1-ad5f-22cb50b36b09",
  type: "page-type/module",
  slug: "tower-derived-beside",
  definition: "the derived numbers a Tower character's sheet shows, each with its formula",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Every derived number the Tower has is listed here with the formula working it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A derived number is named by its page's title.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The numbers are listed in the order the sheet shows them.",
    },
  ],
} as const satisfies Module
