import type { InstantProperty } from "@akasha/pages-system/instant-property"

export type FavoritedAt = string

export const favoritedAt = {
  id: "01a0658b-3654-728d-9ec0-762700250f71",
  pageTypeSlug: "instant-property",
  slug: "favorited-at",
  propertySlug: "favorited-at",
  definition: "when Alan marked a page one he comes back to",
} as const satisfies InstantProperty
