import type { Location } from "../location.page-type.ts"

export const nothingBundtCakes = {
  id: "019f1aec-1033-7f22-9769-7a1b1d3fc823",
  pageTypeSlug: "location",
  slug: "nothing-bundt-cakes",
  title: "Nothing Bundt Cakes",
  address: "987 W 500 N #105, American Fork, UT 84003, United States",
  latitude: 40.3882266,
  longitude: -111.8242073,
  reviewDate: "2018-02-28",
  reviewRating: 5,
  reviewText:
    "The cakes are delicious and I love that I can get a bundtlet for under $5, especially with a bogo coupon.\nThe store is cute, usually has a tasty sample out, and has a lot of neat celebration things for purchase, like birthday plates, candles, etc.",
  sourcePlaceId: "gmaps:0x6fe0a63a31cf3408",
  sourceUrl: "https://www.google.com/maps/place//data=!4m2!3m1!1s0x0:0x6fe0a63a31cf3408",
  locationSource: "review",
  visited: true,
} as const satisfies Location
