import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const findingTreeIds = {
  id: "01a0b733-1335-7905-aadc-12b4dd01c4a9",
  type: "page-type/module",
  slug: "finding-tree-ids",
  definition: "the strings the editor knows the finding tree's view and refresh command by",
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
      statement: "Nothing here names a row of the finding tree.",
    },
  ],
} as const satisfies Module
