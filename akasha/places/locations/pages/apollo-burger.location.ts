import type { Location } from "../location.page-type.ts"

export const apolloBurger = {
  id: "019f1aec-0fd4-7d4e-aacb-fefdd71022f0",
  pageTypeSlug: "location",
  slug: "apollo-burger",
  title: "Apollo Burger",
  address: "452 N State St, Orem, UT 84057, United States",
  latitude: 40.3053543,
  longitude: -111.6982346,
  reviewDate: "2022-09-08",
  reviewRating: 5,
  reviewText:
    "I LOVE their bacon cheese burger it is exactly what I want in a burger. It has thick bacon, crisp lettuce, tomatoes, onions, and Apollo’s delicious house sauce.\nYou can also get it lettuce wrapped for free, and it takes amazing that way as well.\n\nI felt like the baklava was too sticky, but the fry’s and fry sauce are good.\n\nThe shakes are kind of basic, but better than a lot of other burger places.\n\nIf you found this review helpful, please like it so Google and I know. Thanks!",
  sourcePlaceId: "gmaps:0x1f1451f0250f87ad",
  sourceUrl: "https://www.google.com/maps/place//data=!4m2!3m1!1s0x0:0x1f1451f0250f87ad",
  locationSource: "review",
  visited: true,
} as const satisfies Location
