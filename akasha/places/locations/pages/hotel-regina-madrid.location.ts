import type { Location } from "../location.page-type.ts"

export const hotelReginaMadrid = {
  id: "019f1aec-0d67-7de6-bd43-e113c740f65e",
  pageTypeSlug: "location",
  slug: "hotel-regina-madrid",
  title: "Hotel Regina Madrid",
  latitude: 40.4179496,
  longitude: -3.6998271,
  notes: "Stayed here",
  sourcePlaceId: "gmaps:0x9a0d9376949f5735",
  sourceUrl:
    "https://www.google.com/maps/place/Hotel+Regina+Madrid/data=!4m2!3m1!1s0xd4228812e75ebff:0x9a0d9376949f5735",
  locationSource: "saved:Madrid, Spain",
} as const satisfies Location
