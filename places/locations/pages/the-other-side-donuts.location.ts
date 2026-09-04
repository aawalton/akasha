import type { Location } from "../location.page-type.ts"

export const theOtherSideDonuts = {
  id: "019f1aec-0d03-7b5b-bf47-82e516d8e5d1",
  pageTypeSlug: "location",
  slug: "the-other-side-donuts",
  title: "The Other Side Donuts",
  latitude: 40.7528667,
  longitude: -111.9394662,
  notes: "Restaurant group recommendation. I think they have a Matilda chocolate doughnut.",
  sourcePlaceId: "gmaps:0x35d7bd10b2988a21",
  sourceUrl:
    "https://www.google.com/maps/place/The+Other+Side+Donuts/data=!4m2!3m1!1s0x8752f5acddfdb23d:0x35d7bd10b2988a21",
  locationSource: "saved:Want to go",
} as const satisfies Location
