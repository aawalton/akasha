import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const setsLocStringsDe = {
  id: "01a061d7-7bb8-7159-ae33-38d189790073",
  type: "page-type/module",
  slug: "sets-loc-strings-de",
  definition: "the library's own interface text in German",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Text absent here is taken from the English table.",
    },
  ],
  createdAt: "2026-09-02T11:18:27.000Z",
  updatedAt: "2026-09-22T03:24:53.000Z",
} as const satisfies Module
