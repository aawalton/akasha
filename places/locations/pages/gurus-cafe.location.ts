import type { Location } from "../location.page-type.ts"

export const gurusCafe = {
  id: "019f1aec-0eed-7fa9-8731-3379d2851886",
  pageTypeSlug: "location",
  slug: "gurus-cafe",
  title: "Guru's Cafe",
  address: "45 E Center St, Provo, UT 84606, United States",
  latitude: 40.2340419,
  longitude: -111.657845,
  reviewDate: "2021-07-27",
  reviewFlag: "multiple reviews matched this place",
  reviewRating: 5,
  reviewText:
    "My favorite thing to get is the sweet potato fries. They are to live for! Seriously though, everyone loves them, so if you’re sharing, get a large plate or two.\n\nEverything I’ve tried from Guru‘s menu has been delicious and fresh. The portions are large, and the environment novel.\n\nIf you’re looking for a great place to eat in Provo, I highly recommend Guru’s café!\n\nIf you found this review helpful, please like it so Google and I know. Thanks!",
  sourcePlaceId: "gmaps:0x2539fa88353dfb23",
  sourceUrl:
    "https://www.google.com/maps/place/Guru's+Cafe/data=!4m2!3m1!1s0x874d975305f9b47f:0x2539fa88353dfb23",
  locationSource: "saved:Favorite places",
  visited: true,
} as const satisfies Location
