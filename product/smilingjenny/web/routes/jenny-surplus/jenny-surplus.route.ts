import type { Route } from "akasha/code/route/route.page-type.types.ts"

export const jennySurplus = {
  id: "01a07c5d-9ae4-79ac-8807-7f63c08e44df",
  type: "page-type/route",
  slug: "jenny-surplus",
  definition: "Alan's surplus as the color Jenny's tile gives that surplus",
  code: "ts",
  test: "ts",
  urlPath: "api/surplus",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The group of readings served is the one thing named here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The readouts the group has are read off the readout pages.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A readout's label is read off that readout's page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A readout's scale is read off that readout's page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The surplus served here is Alan's rather than Jenny's.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Jenny's tile and Alan's site show one reading rather than two readings taken twice.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A caller into this ring presents Jenny's ring credential.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Only a group no readout is left in answers 503.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A widget reading 503 draws no signal.",
    },
  ],
} as const satisfies Route
