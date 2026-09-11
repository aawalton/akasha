import type { Route } from "akasha/code/routes/route.page-type.types.ts"

export const alanWebCapacitorPageListing = {
  id: "01a08840-980e-747f-9497-1ed8fa4d51f0",
  type: "route",
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
      statement: "The segment in the url is matched against a plural slug.",
    },
    {
      invariantKind: "departure",
      statement: "A segment matching no plural slug is matched against a slug.",
    },
  ],
} as const satisfies Route
