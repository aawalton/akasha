import type { Location } from "../location.page-type.ts"

export const theKolachePlace = {
  id: "019f1aec-103b-70a6-aac5-b3b9f1528705",
  pageTypeSlug: "location",
  slug: "the-kolache-place",
  title: "The Kolache Place",
  address: "434 W Center St, Provo, UT 84601, United States",
  latitude: 40.234,
  longitude: -111.6662,
  reviewDate: "2017-10-05",
  reviewRating: 4,
  sourcePlaceId: "gmaps:0xdbd95fc7db9f0714",
  sourceUrl: "https://www.google.com/maps/place//data=!4m2!3m1!1s0x0:0xdbd95fc7db9f0714",
  locationSource: "review",
  visited: true,
} as const satisfies Location
