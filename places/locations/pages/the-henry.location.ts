import type { Location } from "../location.page-type.ts"

export const theHenry = {
  id: "019f1b49-5578-7344-8344-b96fd7e6511e",
  pageTypeSlug: "location",
  slug: "the-henry",
  title: "The Henry",
  latitude: 40.7999058,
  longitude: -73.9690385,
  sourcePlaceId: "gmaps:0x16be1bb7ecfbc042",
  sourceUrl:
    "https://www.google.com/maps/place/The+Henry/data=!4m2!3m1!1s0x80deaccbfd45748b:0x16be1bb7ecfbc042",
  locationSource: "saved:CA, San Diego",
} as const satisfies Location
