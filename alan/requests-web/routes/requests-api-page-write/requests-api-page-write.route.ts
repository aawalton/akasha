import type { Route } from "akasha/code/route/route.page-type.types.ts"

export const requestsApiPageWrite = {
  id: "01a0c537-bb7d-769b-ad76-62d6b52dd185",
  type: "page-type/route",
  slug: "requests-api-page-write",
  definition: "the page a reader's browser asks to have written",
  code: "ts",
  urlPath: "api/page-write",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "This route's action is the only thing this route's code exports.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "This route is reached by a signed-in reader alone.",
    },
  ],
} as const satisfies Route
