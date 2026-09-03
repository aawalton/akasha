import type { Location } from "../location.page-type.ts"

export const theHatMadrid = {
  id: "019f1aec-0d70-75dc-b8e3-b7c346442ccd",
  pageTypeSlug: "location",
  slug: "the-hat-madrid",
  title: "The Hat Madrid",
  latitude: 40.4145221,
  longitude: -3.7069829,
  notes: "Rooftop dining",
  sourcePlaceId: "gmaps:0xec89625d35a78abb",
  sourceUrl:
    "https://www.google.com/maps/place/The+Hat+Madrid/data=!4m2!3m1!1s0xd42287f399c8ac1:0xec89625d35a78abb",
  locationSource: "saved:Madrid, Spain",
} as const satisfies Location
