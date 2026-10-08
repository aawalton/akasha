import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const setsLocRestStringsEs = {
  id: "01a061d7-7bbc-7b3d-9887-890382553872",
  type: "page-type/module",
  slug: "sets-loc-rest-strings-es",
  definition: "the library's own interface text in Spanish",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Text absent here is taken from the English table.",
    },
  ],
  createdAt: "2026-09-02T11:18:27.004Z",
  updatedAt: "2026-09-22T03:24:53.000Z",
} as const satisfies Module
