import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const setsConstAllClassdata = {
  id: "01a061d7-7bc9-7ba9-94c0-a91d978b1f8a",
  type: "page-type/module",
  slug: "sets-const-all-classdata",
  definition: "every player class the game knows, with its index, name, icon and color",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The class list is read from the game at load rather than written out here.",
    },
  ],
} as const satisfies Module
