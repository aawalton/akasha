import type { Route } from "akasha/code/route/route.page-type.types.ts"

export const alanWebPageListing = {
  id: "01a08831-7693-716c-9cea-7c18de342cc5",
  type: "page-type/route",
  slug: "alan-web-page-listing",
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
