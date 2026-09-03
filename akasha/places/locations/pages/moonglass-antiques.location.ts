import type { Location } from "../location.page-type.ts"

export const moonglassAntiques = {
  id: "019f1aec-0f89-73ed-8d5b-14cf5805a483",
  pageTypeSlug: "location",
  slug: "moonglass-antiques",
  title: "Moonglass Antiques",
  address: "2015 E 3300 S, Salt Lake City, UT 84109, United States",
  latitude: 40.7000889,
  longitude: -111.83353,
  reviewDate: "2023-05-11",
  reviewRating: 5,
  reviewText: "So many cool antiques!",
  sourcePlaceId: "gmaps:0xc6ae82126d777008",
  sourceUrl: "https://www.google.com/maps/place//data=!4m2!3m1!1s0x0:0xc6ae82126d777008",
  locationSource: "review",
  visited: true,
} as const satisfies Location
