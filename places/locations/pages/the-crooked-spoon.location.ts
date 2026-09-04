import type { Location } from "../location.page-type.ts"

export const theCrookedSpoon = {
  id: "019f1b49-5761-7ceb-99f3-06173f2afcff",
  pageTypeSlug: "location",
  slug: "the-crooked-spoon",
  title: "The Crooked Spoon",
  latitude: 42.2163705,
  longitude: -71.5405034,
  sourcePlaceId: "gmaps:0xc349013de61c703e",
  sourceUrl:
    "https://www.google.com/maps/place/The+Crooked+Spoon/data=!4m2!3m1!1s0x88e78e571b5e6487:0xc349013de61c703e",
  locationSource: "saved:Florida",
} as const satisfies Location
