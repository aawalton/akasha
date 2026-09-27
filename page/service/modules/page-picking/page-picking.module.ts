import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const pagePicking = {
  id: "01a0e076-7bb9-7b5f-b0a1-5ffe9e56fdf0",
  type: "page-type/module",
  slug: "page-picking",
  definition: "the pages of one page type a question's `where` names through the index",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A `where` testing a slug with `is` or `in` names the pages filed under that slug.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A `where` testing an id with `is` or `in` names the page filed under that id.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page filed under an id is named for the page type its file name states.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A `where` testing a row's page type names no page of any other page type.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A slug or an id holding a slash names no page, since no page carries one.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A `where` naming none of these names nothing, and every page is read.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The pages named may be more than match, and are never fewer.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here runs a test or reads a page's own body.",
    },
  ],
} as const satisfies Module
