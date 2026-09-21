import type { Route } from "akasha/code/route/route.page-type.types.ts"

export const requestsApiRequestPropose = {
  id: "01a0c54b-6eaf-7e6f-9ed5-6b1d7145650a",
  type: "page-type/route",
  slug: "requests-api-request-propose",
  definition: "the post a contributor opens a feature request with",
  code: "ts",
  urlPath: "api/request-propose",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A request opened here is for the product this site serves and no other.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Who is signed in is read from the session rather than said in the post.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A post by nobody signed in is refused here rather than at the guard.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "What the post does is worked out by `feature-request-asking` alone.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No page write goes through the route every other page write goes through.",
    },
  ],
} as const satisfies Route
