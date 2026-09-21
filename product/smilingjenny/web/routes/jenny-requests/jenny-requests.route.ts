import type { Route } from "akasha/code/route/route.page-type.types.ts"

export const jennyRequests = {
  id: "01a0c4b8-da65-71b0-9dc6-7a1bce543bd3",
  type: "page-type/route",
  slug: "jenny-requests",
  definition: "the feature requests published for Jenny's site",
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
