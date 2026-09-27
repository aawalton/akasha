import type { Route } from "akasha/code/route/route.page-type.types.ts"

export const requestsNoSuchPage = {
  id: "01a0e383-ebe0-7d09-863f-c8090d941bd7",
  type: "page-type/route",
  slug: "requests-no-such-page",
  definition: "that no page of the Requests site is at the address a reader named",
  code: "tsx",
  urlPath: "*",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An address the Requests site has no route for is drawn not found by the root.",
    },
  ],
} as const satisfies Route
