import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const keyNaming = {
  id: "01a0c56b-6f8d-7a73-a14d-5963b94c9672",
  type: "page-type/module",
  slug: "key-naming",
  definition: "the fields of a view that name a key, and the page type whose keys those are",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A field names a key where the page property behind that field says it names one.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A field of a record property is read the same way as a field of the view.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The page type whose keys a view names is the page type that view lists.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A view listing no page type names the keys of no page type.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A key parted by dots names the property its first segment names.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here judges whether a key is declared, nor rewrites a body.",
    },
  ],
} as const satisfies Module
