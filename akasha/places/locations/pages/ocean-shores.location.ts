import type { Location } from "../location.page-type.ts"

export const oceanShores = {
  id: "019f1aec-0c8d-7440-875f-3413ac888f49",
  pageTypeSlug: "location",
  slug: "ocean-shores",
  title: "Ocean Shores",
  latitude: 46.973703,
  longitude: -124.156277,
  sourcePlaceId: "gmaps:0x70097963f182faa3",
  sourceUrl:
    "https://www.google.com/maps/place/Ocean+Shores/data=!4m2!3m1!1s0x5492115a757b7723:0x70097963f182faa3",
  locationSource: "saved:Washington State",
} as const satisfies Location
