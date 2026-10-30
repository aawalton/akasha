import type { Route } from "akasha/code/route/route.page-type.types.ts"

export const atlasApiPlacesSearch = {
  id: "01a0883a-9a45-797a-8b58-e67b92e3c969",
  type: "page-type/route",
  slug: "atlas-api-places-search",
  definition: "the places that match the text a browser sends",
  code: "ts",
  urlPath: "api/alan/collections/places/search",
  createdAt: "2026-09-09T22:12:17.093Z",
  updatedAt: "2026-10-30T14:46:37.736Z",
} as const satisfies Route
