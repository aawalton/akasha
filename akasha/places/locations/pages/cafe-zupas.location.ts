import type { Location } from "../location.page-type.ts"

export const cafeZupas = {
  id: "019f1aec-0f84-7a6c-8ca3-67db40f26d22",
  pageTypeSlug: "location",
  slug: "cafe-zupas",
  title: "Café Zupas",
  address: "55 State St, Orem, UT 84058, United States",
  latitude: 40.2960556,
  longitude: -111.6938336,
  reviewDate: "2024-06-10",
  reviewRating: 5,
  reviewText:
    "I love Zupas food!\n\nMy favorite is the chipotle, chicken salad, and crisp soup. The chocolate cup strawberries are always delicious as well.",
  sourcePlaceId: "gmaps:0xda762aabb9683e49",
  sourceUrl: "https://www.google.com/maps/place//data=!4m2!3m1!1s0x0:0xda762aabb9683e49",
  locationSource: "review",
  visited: true,
} as const satisfies Location
