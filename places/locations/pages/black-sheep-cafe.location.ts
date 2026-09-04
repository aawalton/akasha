import type { Location } from "../location.page-type.ts"

export const blackSheepCafe = {
  id: "019f1aec-1041-75bf-b666-8f428195559e",
  pageTypeSlug: "location",
  slug: "black-sheep-cafe",
  title: "Black Sheep Cafe",
  address: "19 N University Ave, Provo, UT 84601, United States",
  latitude: 40.2342829,
  longitude: -111.6590597,
  reviewDate: "2017-08-04",
  reviewRating: 3,
  reviewText:
    "Honestly, this place is a really nice restaurant, and has that high-end gourmet vibe (which is why we went for our anniversary), But I just found the food way too spicy for my tastes and it came with a high price tag.\nI did love the fresh red rose on the table which actually made my day; food presentation was beautiful, and though it was too spicy for me, my husband enjoyed his food.\n\n2-22-17",
  sourcePlaceId: "gmaps:0xbb3b993934429c54",
  sourceUrl: "https://www.google.com/maps/place//data=!4m2!3m1!1s0x0:0xbb3b993934429c54",
  locationSource: "review",
  visited: true,
} as const satisfies Location
