import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const grammarReading = {
  id: "01a0d9a6-1b77-7b11-b9a9-0c59f925a628",
  type: "page-type/module",
  slug: "grammar-reading",
  definition: "the constructions and the words the grammar reads from akasha's pages",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The constructions are every page of the construction page type, read as rules.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The words are every spelling any page states, whatever page type that page is.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A spelling stating a scope is read only on the pages whose slug opens with that scope's slug.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A construction missing its phrase kind or its items is left out.",
    },
  ],
} as const satisfies Module
