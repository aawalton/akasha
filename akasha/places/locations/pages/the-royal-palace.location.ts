import type { Location } from "../location.page-type.ts"

export const theRoyalPalace = {
  id: "019f1b49-54f9-7089-a03b-5fd472c0a1da",
  pageTypeSlug: "location",
  slug: "the-royal-palace",
  title: "The Royal Palace",
  latitude: 51.4693971,
  longitude: -0.2104963,
  sourcePlaceId: "gmaps:0xbdf97a9648763e36",
  sourceUrl:
    "https://www.google.com/maps/place/The+Royal+Palace/data=!4m2!3m1!1s0x465f9d587e4c4a01:0xbdf97a9648763e36",
  locationSource: "saved:Sweden",
} as const satisfies Location
