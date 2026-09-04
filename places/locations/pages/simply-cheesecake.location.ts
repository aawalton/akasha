import type { Location } from "../location.page-type.ts"

export const simplyCheesecake = {
  id: "019f1aec-0fdb-7b5a-ac47-197ccc7dc324",
  pageTypeSlug: "location",
  slug: "simply-cheesecake",
  title: "Simply Cheesecake",
  address: "291 E 300 S, Provo, UT 84606, United States",
  latitude: 40.2300165,
  longitude: -111.6537156,
  reviewDate: "2021-07-27",
  reviewRating: 5,
  reviewText:
    "Good price, decadent cheesecake.\nLoved the Twix cheesecake.\n\nIf you found this review helpful, please like it so Google and I know. Thanks!",
  sourcePlaceId: "gmaps:0x7be58f983225172b",
  sourceUrl: "https://www.google.com/maps/place//data=!4m2!3m1!1s0x0:0x7be58f983225172b",
  locationSource: "review",
  visited: true,
} as const satisfies Location
