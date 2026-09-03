import type { Location } from "../location.page-type.ts"

export const murrayPark = {
  id: "019f1aec-0f11-74d7-8c53-892ec9caea97",
  pageTypeSlug: "location",
  slug: "murray-park",
  title: "Murray Park",
  latitude: 37.9443807,
  longitude: -122.5536532,
  sourcePlaceId: "gmaps:0x113e555789ecca05",
  sourceUrl:
    "https://www.google.com/maps/place/Murray+Park/data=!4m2!3m1!1s0x87528a21721568c3:0x113e555789ecca05",
  locationSource: "saved:Default list",
} as const satisfies Location
