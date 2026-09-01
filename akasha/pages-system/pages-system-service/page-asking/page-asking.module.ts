import type { Module } from "../../../code-system/module/module.page-type.ts"

export const pageAsking = {
  id: "01a05a07-81e2-7f5f-a79f-e899fbe6699b",
  pageTypeSlug: "module",
  slug: "page-asking",
  definition: "a question put to the pages, and the rows it answers with",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A question names one page type.",
    },
    {
      invariantKind: "departure",
      statement: "The pages of that type are read from the index.",
    },
    {
      invariantKind: "departure",
      statement: "A page type no page is filed under is answered empty.",
    },
    {
      invariantKind: "departure",
      statement: "A row holds the keys the question names.",
    },
    {
      invariantKind: "departure",
      statement: "A question naming no key is answered with every key a page carries.",
    },
    {
      invariantKind: "departure",
      statement: "A key a page does not carry stands in no row.",
    },
    {
      invariantKind: "departure",
      statement: "Rows are ordered by the key the question sorts on.",
    },
    {
      invariantKind: "departure",
      statement: "Rows are ordered by path where the question sorts on nothing.",
    },
    {
      invariantKind: "departure",
      statement: "What is skipped is skipped before what is taken is taken.",
    },
    {
      invariantKind: "absence",
      statement: "No page's file is opened.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here holds an answer for a later question.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes.",
    },
  ],
} as const satisfies Module
