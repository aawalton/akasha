import type { Route } from "akasha/code/route/route.page-type.types.ts"

export const jennySafetyLevel = {
  id: "01a0824d-0956-7e7c-8f1c-271aa57e00a8",
  type: "page-type/route",
  slug: "jenny-safety-level",
  definition: "Alan's safety level as the stoplight Jenny's tile draws",
  code: "ts",
  test: "ts",
  urlPath: "api/safety-level",
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
      statement: "The safety level served here is Alan's rather than Jenny's.",
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
    {
      decisionKind: "decision-kind/constraint",
      statement:
        "Jenny's shipped widget decodes `stoplights` as a list holding at least one stoplight.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "Jenny's shipped widget decodes a stoplight's tier as one of six color names.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The level this route's tests read is a fixture rather than the level Alan is at.",
    },
  ],
} as const satisfies Route
