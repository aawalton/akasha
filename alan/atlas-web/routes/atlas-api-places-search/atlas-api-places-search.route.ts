import type { Route } from "akasha/code-system/routes/route.page-type.types.ts"

export const atlasApiPlacesSearch = {
  id: "01a0883a-9a45-797a-8b58-e67b92e3c969",
  pageTypeSlug: "route",
  type: "route",
  slug: "atlas-api-places-search",
  definition: "the places Geoapify offers for what a reader typed",
  code: "ts",
  urlPath: "api/places/search",
} as const satisfies Route
