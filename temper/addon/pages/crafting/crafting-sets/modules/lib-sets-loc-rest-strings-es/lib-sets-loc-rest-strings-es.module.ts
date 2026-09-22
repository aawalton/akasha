import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const libSetsLocRestStringsEs = {
  id: "01a061d7-7bbc-7b3d-9887-890382553872",
  type: "page-type/module",
  slug: "lib-sets-loc-rest-strings-es",
  definition: "the library's own interface text in Spanish",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Text absent here is taken from the English table.",
    },
  ],
} as const satisfies Module
