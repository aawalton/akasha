import type { Route } from "akasha/code/route/route.page-type.types.ts"

export const atlasPageListing = {
  id: "01a0883c-86f0-7495-92b2-1e1957b490a8",
  type: "page-type/route",
  slug: "atlas-page-listing",
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
