import type { Location } from "../location.page-type.ts"

export const pappalecco = {
  id: "019f1aec-0ff4-7b0d-ac81-fabcd1db90ed",
  pageTypeSlug: "location",
  slug: "pappalecco",
  title: "Pappalecco",
  address: "1602 State St, San Diego, CA 92101, United States",
  latitude: 32.722078,
  longitude: -117.1666587,
  reviewDate: "2019-01-05",
  reviewRating: 5,
  reviewText:
    "Delicious creamy gelato. You pay first, then sample and choose what flavors you want.\nIt’s about $5 for 2 scoops.\n\n*If you found my review helpful, I would greatly appreciate a thumbs up (like) so google and I know. Thanks, and Bon appétit!",
  sourcePlaceId: "gmaps:0x40ff164aecf06ffb",
  sourceUrl: "https://www.google.com/maps/place//data=!4m2!3m1!1s0x0:0x40ff164aecf06ffb",
  locationSource: "review",
  visited: true,
} as const satisfies Location
