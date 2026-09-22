import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const fileRows = {
  id: "01a05bd6-c530-79f9-8daf-bf756d19f77e",
  type: "page-type/module",
  slug: "file-rows",
  definition: "a file-backed page as a row",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A row states its own page type as an address rather than as a bare slug.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "That address is read off the row rather than off the value the row carries.",
    },
  ],
} as const satisfies Module
