import type { Location } from "../location.page-type.ts"

export const chickFilA = {
  id: "019f1aec-1004-7065-a43f-beacb6eb0235",
  pageTypeSlug: "location",
  slug: "chick-fil-a",
  title: "Chick-fil-A",
  address: "121 N State St, Orem, UT 84057, United States",
  latitude: 40.2995922,
  longitude: -111.6965383,
  reviewDate: "2018-08-08",
  reviewRating: 5,
  sourcePlaceId: "gmaps:0x5f824bbe17e87a9",
  sourceUrl: "https://www.google.com/maps/place//data=!4m2!3m1!1s0x0:0x5f824bbe17e87a9",
  locationSource: "review",
  visited: true,
} as const satisfies Location
