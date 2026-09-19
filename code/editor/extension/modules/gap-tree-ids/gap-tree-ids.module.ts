import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const gapTreeIds = {
  id: "01a0b7a0-c25d-78d7-bebd-94055960d71c",
  type: "page-type/module",
  slug: "gap-tree-ids",
  definition: "the strings the editor knows the gap tree's view and refresh command by",
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
      statement: "Nothing here names a row of the gap tree.",
    },
  ],
} as const satisfies Module
