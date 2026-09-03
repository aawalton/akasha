import type { Location } from "../location.page-type.ts"

export const stansDonutsCoffee = {
  id: "019f1aec-0eaa-7de5-a51e-821e40d2d0a6",
  pageTypeSlug: "location",
  slug: "stans-donuts-coffee",
  title: "Stan’s Donuts & Coffee",
  latitude: 41.8918898,
  longitude: -87.6232413,
  notes: "Mary’s friend Hallie really liked their shakes",
  sourcePlaceId: "gmaps:0xeb82598ff887de50",
  sourceUrl:
    "https://www.google.com/maps/place/Stan%E2%80%99s+Donuts+%26+Coffee/data=!4m2!3m1!1s0x880e2daf78ce5601:0xeb82598ff887de50",
  locationSource: "saved:IL, Chicago",
} as const satisfies Location
