import type { Route } from "akasha/code/route/route.page-type.types.ts"

export const alanWebRequests = {
  id: "01a0c4b8-da5b-7951-8da4-29d8cdf3e4cd",
  type: "page-type/route",
  slug: "alan-web-requests",
  definition: "the redirect from the old feature request page to the Requests site",
  code: "ts",
  urlPath: "requests",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Feature requests are read and opened on the Requests site and nowhere else.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "This path remains, so a reader who kept it is carried rather than refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The move is answered as permanent, the page having gone for good.",
    },
  ],
} as const satisfies Route
