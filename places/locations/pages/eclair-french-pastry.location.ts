import type { Location } from "../location.page-type.ts"

export const eclairFrenchPastry = {
  id: "019f1aec-0d38-74e0-a40b-a1a93144c346",
  pageTypeSlug: "location",
  slug: "eclair-french-pastry",
  title: "Eclair French Pastry",
  address: "7948 S 1300 E, Sandy, UT 84094, United States",
  latitude: 40.6073099,
  longitude: -111.8553078,
  notes: "French bakery, specializes in eclairs",
  reviewDate: "2022-09-10",
  reviewRating: 4,
  reviewText:
    "A clean and well decorated restaurant with good selection of delicious pastries.\n\nWe tried a classic a hazelnut eclair and a raspberry eclair and enjoyed both.\n\nThey had chess and backgammon available to play, which we enjoyed.\n\nThey also have a nice tea set up.\n\nIf you found this review helpful, please like it so Google and I know. Thanks!",
  sourcePlaceId: "gmaps:0x310f6ca4405e222d",
  sourceUrl:
    "https://www.google.com/maps/place/Eclair+French+Pastry/data=!4m2!3m1!1s0x875261f7b48c5691:0x310f6ca4405e222d",
  locationSource: "saved:Want to go",
  visited: true,
} as const satisfies Location
