import type { Location } from "../location.page-type.ts"

export const northShoreTacos = {
  id: "019f1aec-0fec-73b7-8625-ccb2dbf12041",
  pageTypeSlug: "location",
  slug: "north-shore-tacos",
  title: "North Shore Tacos",
  address: "54-296 Kamehameha Hwy, Hauula, HI 96717, United States",
  latitude: 21.6191682,
  longitude: -157.9152026,
  reviewDate: "2019-05-05",
  reviewRating: 4,
  reviewText:
    "Loved the beef quesadillas with beans and rice. Highly recommend.\n\nI’d give 5 stars but the guacamole wasn’t very good. The shrimp taco and special sauce were delicious though!\n\nLoved this place enough to comeback a second time while still on vacation.\n\n*If you found my review helpful, I would greatly appreciate a thumbs up (like) so google and I know. Thanks, and Bon appétit!",
  sourcePlaceId: "gmaps:0x7a4b9320f810a3a3",
  sourceUrl: "https://www.google.com/maps/place//data=!4m2!3m1!1s0x0:0x7a4b9320f810a3a3",
  locationSource: "review",
  visited: true,
} as const satisfies Location
