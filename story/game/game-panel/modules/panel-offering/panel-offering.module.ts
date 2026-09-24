import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const panelOffering = {
  id: "01a0c4ad-6d02-7bc5-a1c0-3cc32a3c9f2b",
  type: "page-type/module",
  slug: "panel-offering",
  definition: "what the app offers a panel to be made of, laid out under the names panels use",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A panel names what it is made of by the path the app was built from.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "What is offered here is what a panel may reach, and nothing else is reachable.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Adding a panel needs nothing here, and only a new piece to build one of does.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No panel is named here.",
    },
  ],
} as const satisfies Module
