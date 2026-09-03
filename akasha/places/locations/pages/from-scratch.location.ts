import type { Location } from "../location.page-type.ts"

export const fromScratch = {
  id: "019f1aec-0cc4-7e43-a6bb-094727f5dd96",
  pageTypeSlug: "location",
  slug: "from-scratch",
  title: "From Scratch",
  latitude: 35.7012772,
  longitude: 139.7718802,
  sourcePlaceId: "gmaps:0x1a32619cc04c7f79",
  sourceUrl:
    "https://www.google.com/maps/place/From+Scratch/data=!4m2!3m1!1s0x8752f50e2cf97c63:0x1a32619cc04c7f79",
  locationSource: "saved:Want to go",
} as const satisfies Location
