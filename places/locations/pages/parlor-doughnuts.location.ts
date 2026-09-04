import type { Location } from "../location.page-type.ts"

export const parlorDoughnuts = {
  id: "019f1aec-0e00-77d4-9f79-a324e5bbe526",
  pageTypeSlug: "location",
  slug: "parlor-doughnuts",
  title: "Parlor Doughnuts",
  latitude: 40.3583958,
  longitude: -111.769341,
  notes: "Layered doughnuts",
  sourcePlaceId: "gmaps:0x3a3eb11747d9030f",
  sourceUrl:
    "https://www.google.com/maps/place/Parlor+Doughnuts/data=!4m2!3m1!1s0x874d85002a3fdad5:0x3a3eb11747d9030f",
  locationSource: "saved:UT, Utah County",
} as const satisfies Location
