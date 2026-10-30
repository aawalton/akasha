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
        "A spelling stating a scope is read on that scope's page and on every page beneath it in the parts.",
    },
    {
      decisionKind: "decision-kind/stopgap",
      statement:
        "A spelling stating a scope is also read on the pages whose slug opens with that scope's slug.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page beneath a scope is known by its slug alone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A construction missing its phrase kind or its items is left out.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The definitions are those of every page of the domain page type or a type under it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The definitions are read in the order of their paths.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The rules and the words are also read from pages handed in, as a reader holding them does.",
    },
  ],
  createdAt: "2026-09-25T17:38:57.015Z",
  updatedAt: "2026-10-30T14:57:35.245Z",
} as const satisfies Module
