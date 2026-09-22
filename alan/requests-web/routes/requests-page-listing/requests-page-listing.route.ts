import type { Route } from "akasha/code/route/route.page-type.types.ts"

export const requestsPageListing = {
  id: "01a0c537-bae8-7469-9b49-1e210203179a",
  type: "page-type/route",
  slug: "requests-page-listing",
  definition: "the pages of a page type, drawn as a list",
  code: "tsx",
  urlPath: ":pageTypeSlug",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The segment in the url is the page type's slug.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A slug reaching no page type is answered 404.",
    },
  ],
} as const satisfies Route
