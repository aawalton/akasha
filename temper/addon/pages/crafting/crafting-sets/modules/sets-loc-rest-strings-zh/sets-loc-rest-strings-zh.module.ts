import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const setsLocRestStringsZh = {
  id: "01a061d7-7bc2-7b7f-96ff-576e321497de",
  type: "page-type/module",
  slug: "sets-loc-rest-strings-zh",
  definition: "the library's own interface text in Chinese",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Text absent here is taken from the English table.",
    },
  ],
} as const satisfies Module
