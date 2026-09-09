import type { Route } from "@akasha/code/route"

export const atlasApiLocationsIngest = {
  id: "01a0883c-14d1-7a1c-a698-90f866ce6b06",
  pageTypeSlug: "route",
  slug: "atlas-api-locations-ingest",
  definition: "the batch of location traces a device sends in",
  code: "ts",
  urlPath: "api/locations/ingest",
} as const satisfies Route
