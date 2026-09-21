import type { Route } from "akasha/code/route/route.page-type.types.ts"

export const requestsApiRequests = {
  id: "01a0c54b-6eaf-7e6f-9ed5-6b1d7145650a",
  type: "page-type/route",
  slug: "requests-api-requests",
  definition: "the post a contributor opens a feature request with, or boosts one with",
  code: "ts",
  urlPath: "api/requests",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A request opened here is for the product this site serves and no other.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "One route takes every act over a feature request, and the post says which.",
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
