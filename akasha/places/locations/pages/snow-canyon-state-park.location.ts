import type { Location } from "../location.page-type.ts"

export const snowCanyonStatePark = {
  id: "019f1b49-5606-76d8-9f54-b5b7eae66264",
  pageTypeSlug: "location",
  slug: "snow-canyon-state-park",
  title: "Snow Canyon State Park",
  latitude: -33.960833,
  longitude: 22.46789,
  sourcePlaceId: "gmaps:0x680b16022dc66697",
  sourceUrl:
    "https://www.google.com/maps/place/Snow+Canyon+State+Park/data=!4m2!3m1!1s0x80ca69dbff8e87e5:0x680b16022dc66697",
  locationSource: "saved:UT, St. George",
} as const satisfies Location
