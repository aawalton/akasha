import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const serviceTreeReading = {
  id: "01a09c1e-c132-7ac7-99be-352e386c4030",
  type: "page-type/module",
  slug: "service-tree-reading",
  definition: "how many rows a service tree holds and how many of them are services",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The rows the tree has are counted apart from the services among the rows.",
    },

    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads the index.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here asks a service anything.",
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
