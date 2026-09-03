import type { Location } from "../location.page-type.ts"

export const parisBaguette = {
  id: "019f1aec-0d04-7e88-afeb-106ee3171c72",
  pageTypeSlug: "location",
  slug: "paris-baguette",
  title: "Paris Baguette",
  latitude: 48.8585053,
  longitude: 2.3460897,
  sourcePlaceId: "gmaps:0xe7c9b1d4498966ea",
  sourceUrl:
    "https://www.google.com/maps/place/Paris+Baguette/data=!4m2!3m1!1s0x87528925204291eb:0xe7c9b1d4498966ea",
  locationSource: "saved:Want to go",
} as const satisfies Location
