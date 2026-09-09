import type { Route } from "@akasha/code/route"

export const alanWebCapacitorPageListing = {
  id: "01a08840-980e-747f-9497-1ed8fa4d51f0",
  pageTypeSlug: "route",
  slug: "alan-web-capacitor-page-listing",
  definition: "the pages of one page type, drawn as a list",
  code: "tsx",
  urlPath: ":pageTypeSlug",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The page types are read in the browser rather than on a server.",
    },
    {
      invariantKind: "departure",
      statement: "The segment in the url is matched against a plural slug, then against a slug.",
    },
  ],
} as const satisfies Route
