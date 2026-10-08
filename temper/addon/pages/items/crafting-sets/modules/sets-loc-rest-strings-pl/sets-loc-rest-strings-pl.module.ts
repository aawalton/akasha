import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const setsLocRestStringsPl = {
  id: "01a061d7-7bc0-76a6-aea1-86cfc69fa919",
  type: "page-type/module",
  slug: "sets-loc-rest-strings-pl",
  definition: "the library's own interface text in Polish",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Text absent here is taken from the English table.",
    },
  ],
  createdAt: "2026-09-02T11:18:27.008Z",
  updatedAt: "2026-09-22T03:24:53.000Z",
} as const satisfies Module
