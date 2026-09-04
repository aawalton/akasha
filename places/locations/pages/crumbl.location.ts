import type { Location } from "../location.page-type.ts"

export const crumbl = {
  id: "019f1aec-0fe0-7c3d-979a-7d231208987f",
  pageTypeSlug: "location",
  slug: "crumbl",
  title: "Crumbl",
  address: "154 W 1230 N St, Provo, UT 84604, United States",
  latitude: 40.2510376,
  longitude: -111.6611118,
  reviewDate: "2021-07-27",
  reviewRating: 4,
  reviewText:
    "Crumbl cookies are delicious and unique. Each week they choose new flavors to feature that are so creative. Sometimes I don’t like a specific flavor, but they are always getting feedback and improving their recipes. I consistently love their chilled frosted sugar cookie, it is AMAZING!\n\nTheir boxes of cookies also make great gifts.\n\nIf you found this review helpful, please like it so Google and I know. Thanks!",
  sourcePlaceId: "gmaps:0x1817489e387683d6",
  sourceUrl: "https://www.google.com/maps/place//data=!4m2!3m1!1s0x0:0x1817489e387683d6",
  locationSource: "review",
  visited: true,
} as const satisfies Location
