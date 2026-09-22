import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const treasurePinsData00 = {
  id: "01a061d5-d0b9-7759-a22d-cab177782406",
  type: "page-type/module",
  slug: "treasure-pins-data-00",
  definition: "part 00 of the pins each map has",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "These rows are stated by upstream LibTreasure v24.",
    },
  ],
} as const satisfies Module
