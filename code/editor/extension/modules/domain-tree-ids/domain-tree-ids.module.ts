import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const domainTreeIds = {
  id: "01a064c8-9a9c-76e0-a025-5d952e3be0ea",
  type: "page-type/module",
  slug: "domain-tree-ids",
  definition: "the editor's ids for the domain tree's view and refresh command",
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
      statement: "Nothing here names a row of the domain tree.",
    },
  ],
} as const satisfies Module
