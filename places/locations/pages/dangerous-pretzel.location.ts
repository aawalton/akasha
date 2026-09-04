import type { Location } from "../location.page-type.ts"

export const dangerousPretzel = {
  id: "019f1aec-0cf3-70a9-9f4b-dd7aa649d6fb",
  pageTypeSlug: "location",
  slug: "dangerous-pretzel",
  title: "Dangerous Pretzel",
  latitude: 40.7567118,
  longitude: -111.9014936,
  notes: "Saw on Instagram. Lots of fun variety pretzels.",
  sourcePlaceId: "gmaps:0xb094718ff5a6c1c3",
  sourceUrl:
    "https://www.google.com/maps/place/Dangerous+Pretzel/data=!4m2!3m1!1s0x8752f567c0d158f1:0xb094718ff5a6c1c3",
  locationSource: "saved:Want to go",
} as const satisfies Location
