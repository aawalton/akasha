import type { Location } from "../location.page-type.ts"

export const theBakedBear = {
  id: "019f1aec-0ffa-76c5-8777-535d39014974",
  pageTypeSlug: "location",
  slug: "the-baked-bear",
  title: "The Baked Bear",
  address: "1249 E Main St, Lehi, UT 84043, United States",
  latitude: 40.3886111,
  longitude: -111.8297222,
  reviewDate: "2018-08-26",
  reviewRating: 5,
  reviewText:
    "This place is fun. It’s well decorated, clean, the staff is friendly, the pricing is reasonable and the food is delicious!\n\nI loved how soft the cookies and brownies were, and that they can heat them up for you ice cream sandwich.\n\nMy husband and I tried combo sandwiches, meaning half cookie half brownie. I tried a cookies and cream cookie and it was good.\nMy husband particularly liked his dark chocolate ice cream. He said it was super creamy.\n\nI look forward to coming back.",
  sourcePlaceId: "gmaps:0x5423e450cbc78fe5",
  sourceUrl: "https://www.google.com/maps/place//data=!4m2!3m1!1s0x0:0x5423e450cbc78fe5",
  locationSource: "review",
  visited: true,
} as const satisfies Location
