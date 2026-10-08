import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const setsLocRestStringsRu = {
  id: "01a061d7-7bc1-75a9-8b21-5c2e51a9a6fb",
  type: "page-type/module",
  slug: "sets-loc-rest-strings-ru",
  definition: "the library's own interface text in Russian",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Text absent here is taken from the English table.",
    },
  ],
  createdAt: "2026-09-02T11:18:27.009Z",
  updatedAt: "2026-09-22T03:24:53.000Z",
} as const satisfies Module
