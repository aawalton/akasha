import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const pageTreeIds = {
  id: "01a064c8-9a9c-7e5f-b6da-e2f88bc5c4c9",
  type: "page-type/module",
  slug: "page-tree-ids",
  definition: "the editor's strings for the page tree's view and refresh command",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The names here are the names the extension manifest has.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The refresh command's name opens with the view's name.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here makes the view or the command these names reach.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here names a row of the page tree.",
    },
  ],
} as const satisfies Module
