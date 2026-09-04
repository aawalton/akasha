import type { Location } from "../location.page-type.ts"

export const villageInn = {
  id: "019f1aec-0f83-74dd-a5ae-32bd64049b48",
  pageTypeSlug: "location",
  slug: "village-inn",
  title: "Village Inn",
  address: "933 S University Ave, Provo, UT 84606, United States",
  latitude: 40.22152,
  longitude: -111.65839,
  reviewDate: "2024-10-19",
  reviewRating: 5,
  reviewText:
    "We enjoyed our meal and our server Dylan was exceptional! He really made it a great experience.",
  sourcePlaceId: "gmaps:0xd9a25ee87baf9f07",
  sourceUrl: "https://www.google.com/maps/place//data=!4m2!3m1!1s0x0:0xd9a25ee87baf9f07",
  locationSource: "review",
  visited: true,
} as const satisfies Location
