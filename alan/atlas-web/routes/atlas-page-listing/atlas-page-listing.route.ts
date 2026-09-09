import type { Route } from "@akasha/code/route"

export const atlasPageListing = {
  id: "01a0883c-86f0-7495-92b2-1e1957b490a8",
  pageTypeSlug: "route",
  slug: "atlas-page-listing",
  definition: "the pages of one page type, drawn as a list",
  code: "tsx",
  urlPath: ":pageTypeSlug",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The segment in the url is the page type's plural slug.",
    },
    {
      invariantKind: "departure",
      statement: "A plural slug reaching no page type is answered 404.",
    },
  ],
} as const satisfies Route
