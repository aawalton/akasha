import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const refusalTreeIds = {
  id: "01a0d94c-a29d-744e-a1b8-b9a98d716978",
  type: "page-type/module",
  slug: "refusal-tree-ids",
  definition: "the editor's strings for the refusal tree's view and refresh command",
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
  ],
} as const satisfies Module
