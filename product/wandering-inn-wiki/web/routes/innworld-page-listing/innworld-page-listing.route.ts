import type { Route } from "akasha/code/route/route.page-type.types.ts"

export const innworldPageListing = {
  id: "01a0c5fc-31a5-75df-9ea9-6a8ef459b23f",
  type: "page-type/route",
  slug: "innworld-page-listing",
  definition: "the pages of a page type, drawn as a list",
  code: "tsx",
  urlPath: ":pageTypeSlug",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A slug reaching no page type the visitor may read is answered 404.",
    },
  ],
} as const satisfies Route
