import type { Location } from "../location.page-type.ts"

export const rijksmuseum = {
  id: "019f1aec-0e3f-71a4-b8f6-f9feef400c93",
  pageTypeSlug: "location",
  slug: "rijksmuseum",
  title: "Rijksmuseum",
  latitude: 52.3598431,
  longitude: 4.8850395,
  sourcePlaceId: "gmaps:0xd54373ae6a408585",
  sourceUrl:
    "https://www.google.com/maps/place/Rijksmuseum/data=!4m2!3m1!1s0x47c609eec1bb16e5:0xd54373ae6a408585",
  locationSource: "saved:Netherlands",
} as const satisfies Location
