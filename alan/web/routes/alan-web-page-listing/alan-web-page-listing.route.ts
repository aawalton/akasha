import type { Route } from "@akasha/code/route"

export const alanWebPageListing = {
  id: "01a08831-7693-716c-9cea-7c18de342cc5",
  pageTypeSlug: "route",
  slug: "alan-web-page-listing",
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
