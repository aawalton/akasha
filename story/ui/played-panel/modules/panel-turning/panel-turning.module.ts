import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const panelTurning = {
  id: "01a0c4a9-ae08-7564-ae1b-c05deab3547b",
  type: "page-type/module",
  slug: "panel-turning",
  definition: "a panel's code turned into what a browser runs, its imports read off the app",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An import of values becomes a reading of the surface the app offers.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An import of types is taken away, a browser having no use for one.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The line marking code as the client's is taken away.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here parses the code, so a panel writing anything else is on its own.",
    },
  ],
} as const satisfies Module
