import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const personaRoutingRun = {
  id: "01a0a145-492c-7088-9b18-a9912de34fe6",
  type: "page-type/module",
  slug: "persona-routing-run",
  definition: "how code adds the email routing rules the personas need",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A second run over a zone the first run wrote to writes nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each address is named as soon as the rule routing it is written.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A run hands the list it was handed down, so a run that threw names what it routed first.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A write refused is carried out rather than caught and counted as done.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The destination is worked out from the rules read rather than handed to the run.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The addresses to route are read off the persona pages in the checkout.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The zone is named once here, as both the domain filtered on and the zone read.",
    },
  ],
  createdAt: "2026-09-14T18:54:27.628Z",
  updatedAt: "2026-10-30T15:54:13.320Z",
} as const satisfies Module
