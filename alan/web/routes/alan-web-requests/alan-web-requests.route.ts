import type { Route } from "akasha/code/route/route.page-type.types.ts"

export const alanWebRequests = {
  id: "01a0c4b8-da5b-7951-8da4-29d8cdf3e4cd",
  type: "page-type/route",
  slug: "alan-web-requests",
  definition: "the feature requests published for alanwalton.com",
  code: "tsx",
  urlPath: "requests",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "This page is open to a reader who has not signed in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "This page serves the published requests alone, most points first.",
    },
  ],
} as const satisfies Route
