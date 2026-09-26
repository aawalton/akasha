import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const worldTreeView = {
  id: "01a0de0e-7197-7f62-8741-0bc64c4cbef9",
  type: "page-type/module",
  slug: "world-tree-view",
  definition: "the rows the editor asks for of the world tree and what each row is drawn as",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A row is matched against its label.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A row is identified apart while a filter is there.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A row carries how many rows are under it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A row clicked opens the address that row carries in the browser.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here makes the view these rows are drawn in.",
    },
  ],
} as const satisfies Module
