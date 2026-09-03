import type { Location } from "../location.page-type.ts"

export const kensingtonCafe = {
  id: "019f1aec-0e54-7675-afde-f98f7575dc7b",
  pageTypeSlug: "location",
  slug: "kensington-cafe",
  title: "Kensington Cafe",
  address: "4141 Adams Ave, San Diego, CA 92116, United States",
  latitude: 32.7630417,
  longitude: -117.1061173,
  reviewDate: "2019-01-05",
  reviewRating: 5,
  reviewText:
    "This place seemed to be in a nice area, was well decorated, and best of all, the food was amazing!\nI got the “The Parkside” egg scramble (red onions, bacon, spinach, and Jack and cheddar); it came with mixed potatos (plain, sweet and purple), and I paid to sub the toast for a side of fruit, which was fresh and delicious (pineapple, strawberries and grapes). It was all soo good, I highly recommend this place.\n\nThey also sell pastries.\n\n*If you found my review helpful, I would greatly appreciate a thumbs up (like) so google and I know. Thanks, and Bon appétit!",
  sourcePlaceId: "gmaps:0xdf541a36ecf6f05e",
  sourceUrl:
    "https://www.google.com/maps/place/Kensington+Cafe/data=!4m2!3m1!1s0x80d95449713b2939:0xdf541a36ecf6f05e",
  locationSource: "saved:CA, San Diego; saved:Favorite places",
  visited: true,
} as const satisfies Location
