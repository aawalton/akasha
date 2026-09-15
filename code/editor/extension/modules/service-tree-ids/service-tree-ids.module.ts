import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const serviceTreeIds = {
  id: "01a09c1e-1b2b-7d00-9af9-d732e6e67ab3",
  type: "module",
  slug: "service-tree-ids",
  definition: "the strings the editor knows the service tree's view and refresh command by",
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
      statement: "Nothing here names a row of the service tree.",
    },
  ],
} as const satisfies Module
