import type { Location } from "../location.page-type.ts"

export const gardnerVillage = {
  id: "019f1aec-0fde-7300-86f1-860f718f4a7f",
  pageTypeSlug: "location",
  slug: "gardner-village",
  title: "Gardner Village",
  address: "1100 W 7800 S, West Jordan, UT 84088, United States",
  latitude: 40.6093286,
  longitude: -111.9228319,
  reviewDate: "2021-07-27",
  reviewRating: 5,
  reviewText:
    "This place is seriously delicious. I got the chicken pesto panini and loved it! Would totally get it again.\n\nI also tried the raspberry tart and it was perfect.\n\nIf you found this review helpful, please like it so Google and I know. Thanks!",
  sourcePlaceId: "gmaps:0xaf799c2b6d1cc153",
  sourceUrl: "https://www.google.com/maps/place//data=!4m2!3m1!1s0x0:0xaf799c2b6d1cc153",
  locationSource: "review",
  visited: true,
} as const satisfies Location
