import type { Location } from "../location.page-type.ts"

export const pepperidgeFarmThriftStore = {
  id: "019f1aec-0fe9-7680-9920-5b04fb91b1fc",
  pageTypeSlug: "location",
  slug: "pepperidge-farm-thrift-store",
  title: "Pepperidge Farm Thrift Store",
  address: "901 US-91, Richmond, UT 84333, United States",
  latitude: 41.9399663,
  longitude: -111.8149858,
  reviewDate: "2019-07-22",
  reviewRating: 4,
  sourcePlaceId: "gmaps:0x56c01d483b3e037c",
  sourceUrl: "https://www.google.com/maps/place//data=!4m2!3m1!1s0x0:0x56c01d483b3e037c",
  locationSource: "review",
  visited: true,
} as const satisfies Location
