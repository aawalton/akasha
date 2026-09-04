import type { Location } from "../location.page-type.ts"

export const pennyAnnsCafe = {
  id: "019f1aec-103d-7b2b-ace1-eda606d67e08",
  pageTypeSlug: "location",
  slug: "penny-anns-cafe",
  title: "Penny Ann's Cafe",
  address: "280 E 12300 S #118, Draper, UT 84020, United States",
  latitude: 40.525491,
  longitude: -111.882057,
  reviewDate: "2017-08-04",
  reviewRating: 4,
  reviewText:
    'The "hashbrowns" are really more like crisp french fries, which was definitely disappointing until I decided to think of them as french fries.\n\nThe omelette is thin cooked eggs with all the fillings sandwiched in the middle, which I didn\'t love, but it still tasted good.\n\nThe pancakes really are "heavenly" and the pie is irresistible (I tried the chocolate mouse pie).\n\nI\'ve been here about 3 times so far (twice with my daughter as a date) and I\'ll definitely be back!',
  sourcePlaceId: "gmaps:0xec14cbcc56dfb3e6",
  sourceUrl: "https://www.google.com/maps/place//data=!4m2!3m1!1s0x0:0xec14cbcc56dfb3e6",
  locationSource: "review",
  visited: true,
} as const satisfies Location
