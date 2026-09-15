import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const commandTreeReading = {
  id: "01a07c93-8051-7e6d-aef6-f3c7665bbb9f",
  type: "module",
  slug: "command-tree-reading",
  definition: "how many rows a command tree holds and how many of them are commands",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The rows the tree has are counted apart from the commands among the rows.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads the index.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here asks a command anything.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here assembles a tree.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here draws a row.",
    },
  ],
} as const satisfies Module
