import type { Location } from "../location.page-type.ts"

export const sweetalyGelato = {
  id: "019f1aec-0ef0-7ad7-827b-e211a540d85e",
  pageTypeSlug: "location",
  slug: "sweetaly-gelato",
  title: "Sweetaly Gelato",
  address: "1527 S 1500 E, Salt Lake City, UT 84105, United States",
  latitude: 40.7364743,
  longitude: -111.8477547,
  notes: "Legit!",
  reviewDate: "2022-09-10",
  reviewRating: 5,
  reviewText:
    "I can’t believe I haven’t reviewed this place yet. It is hands-down the best gelato in Utah!\n\nI fell in love with gelato in Italy, and this place is legit! The flavors are always incredibly creamy, flavorful, and fresh.\n\n10 out of 10 would recommend!\n\nThey also sell Gelato cakes, which I still need to try.\n\nIf you found this review helpful, please like it so Google and I know. Thanks!",
  sourcePlaceId: "gmaps:0x7c0530e13362493e",
  sourceUrl:
    "https://www.google.com/maps/place/Sweetaly+Gelato/data=!4m2!3m1!1s0x8752600434b850e3:0x7c0530e13362493e",
  locationSource: "saved:UT, SLC; saved:Favorite places",
  visited: true,
} as const satisfies Location
