import type { Route } from "akasha/code/route/route.page-type.types.ts"

export const stoplightsActivity = {
  id: "01a0d9ad-77ce-78e2-8c55-034a9f3ed89f",
  type: "page-type/route",
  slug: "stoplights-activity",
  definition: "the stoplights the live activity draws, answered in the shape the activity reads",
  code: "ts",
  urlPath: "api/stoplights-activity",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The groups answered are the ones whose pages name this route.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The answer has the shape a pushed reading has.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An answer with no stoplight is no reading.",
    },
  ],
} as const satisfies Route
