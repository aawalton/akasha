import type { Route } from "akasha/code/route/route.page-type.types.ts"

export const requestsNoSuchPage = {
  id: "01a0e383-ebe0-7d09-863f-c8090d941bd7",
  type: "page-type/route",
  slug: "requests-no-such-page",
  definition: "the error the Requests site shows for a path with no page",
  code: "tsx",
  urlPath: "*",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An address the Requests site has no route for is drawn not found by the root.",
    },
  ],
  createdAt: "2026-09-27T15:37:48.768Z",
  updatedAt: "2026-10-30T16:23:15.185Z",
} as const satisfies Route
