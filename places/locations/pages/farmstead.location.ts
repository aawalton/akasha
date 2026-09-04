import type { Location } from "../location.page-type.ts"

export const farmstead = {
  id: "019f1aec-0e82-73e3-80a3-6daf41c0418e",
  pageTypeSlug: "location",
  slug: "farmstead",
  title: "Farmstead",
  latitude: 37.0642917,
  longitude: -113.5154037,
  notes: "Former Michelin star chef’s. Import their butter from France.",
  sourcePlaceId: "gmaps:0xf96d693e5a1e54e2",
  sourceUrl:
    "https://www.google.com/maps/place/Farmstead/data=!4m2!3m1!1s0x80ca459e541aae11:0xf96d693e5a1e54e2",
  locationSource: "saved:UT, St. George",
} as const satisfies Location
