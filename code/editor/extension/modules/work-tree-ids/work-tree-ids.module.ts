import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const workTreeIds = {
  id: "01a064c8-9a9c-7f08-a940-edc2c37c2024",
  type: "page-type/module",
  slug: "work-tree-ids",
  definition: "the editor's strings for the work tree's view and its commands",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The names here are the names the extension manifest has.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every command's name opens with the view's name.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here makes the view or the commands these names reach.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here names a row of the work tree.",
    },
  ],
} as const satisfies Module
