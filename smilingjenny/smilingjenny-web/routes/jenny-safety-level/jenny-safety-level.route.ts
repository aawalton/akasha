import type { Route } from "@akasha/code/route"

export const jennySafetyLevel = {
  id: "01a0824d-0956-7e7c-8f1c-271aa57e00a8",
  pageTypeSlug: "route",
  slug: "jenny-safety-level",
  definition: "Alan's safety level as the stoplight Jenny's tile draws that level in",
  code: "ts",
  test: "ts",
  urlPath: "api/safety-level",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The group of readings served is the one thing named here.",
    },
    {
      invariantKind: "departure",
      statement: "The readouts the group has are read off the readout pages.",
    },
    {
      invariantKind: "departure",
      statement: "A readout's label is read off that readout's page.",
    },
    {
      invariantKind: "departure",
      statement: "A readout's scale is read off that readout's page.",
    },
    {
      invariantKind: "departure",
      statement: "The safety level served here is Alan's rather than Jenny's.",
    },
    {
      invariantKind: "departure",
      statement:
        "Jenny's tile and Alan's site show one reading rather than two readings taken twice.",
    },
    {
      invariantKind: "departure",
      statement: "A caller into this ring presents Jenny's ring credential.",
    },
    {
      invariantKind: "departure",
      statement: "A group with nothing carried in answers 503.",
    },
    {
      invariantKind: "departure",
      statement: "A widget reading 503 draws no signal.",
    },
    {
      invariantKind: "constraint",
      statement: "Jenny's shipped widget decodes `stoplights` as a list with at least one.",
    },
    {
      invariantKind: "constraint",
      statement: "Jenny's shipped widget decodes a stoplight's tier as one of six color names.",
    },
    {
      invariantKind: "departure",
      statement: "The level this route's tests read is a fixture rather than the level Alan is at.",
    },
  ],
} as const satisfies Route
