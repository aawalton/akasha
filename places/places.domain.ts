import type { Domain } from "../domains/domain.page-type.ts"

export const places = {
  id: "01a06590-0000-7000-8000-000000000201",
  pageTypeSlug: "domain",
  slug: "places",
  definition: "the places somebody kept on the map and what is redeemable at them",
  partSlugs: [
    "page-type/location",
    "page-type/location-collection",
    "page-type/location-deal",
    "page-type/restaurant",
    "page-type/restaurant-collection",
    "page-type/restaurant-menu-item",
    "page-type/travel-collection",
  ],
} as const satisfies Domain
