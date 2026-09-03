import type { Location } from "../location.page-type.ts"

export const voodooDoughnut = {
  id: "019f1aec-0fb9-79da-8df6-fec6dab222ae",
  pageTypeSlug: "location",
  slug: "voodoo-doughnut",
  title: "Voodoo Doughnut",
  address: "6000 Universal Blvd, Orlando, FL 32819, United States",
  latitude: 28.4738556,
  longitude: -81.465686,
  reviewDate: "2022-09-10",
  reviewFlag: "multiple reviews matched this place",
  reviewRating: 5,
  reviewText:
    "Crazy popular, but worth the wait! These donuts were unique and delicious.\n\nThe store is located on universal’s City Walk, just outside the Universal Studios entrance.\n\nThey have an order ahead option to save you from waiting in line.\n\nIf you found this review helpful, please like it so Google and I know. Thanks!",
  sourcePlaceId: "gmaps:0x45346bd87f1ee19a",
  sourceUrl: "https://www.google.com/maps/place//data=!4m2!3m1!1s0x0:0x45346bd87f1ee19a",
  locationSource: "review",
  visited: true,
} as const satisfies Location
