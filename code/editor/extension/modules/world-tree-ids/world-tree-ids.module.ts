import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const worldTreeIds = {
  id: "01a0de0e-7196-7ad3-99f6-89c98783ce5d",
  type: "page-type/module",
  slug: "world-tree-ids",
  definition: "the editor's ids for the worlds panel's view and the command opening a row's page",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The view's name here is the name the extension manifest has.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The opening command's name opens with the view's name.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "The manifest names no command here, since only a row calls it.",
    },
  ],
} as const satisfies Module
