import type { Location } from "../location.page-type.ts"

export const spaceNeedle = {
  id: "019f1aec-0ca9-708e-a354-8a0fc9055f1f",
  pageTypeSlug: "location",
  slug: "space-needle",
  title: "Space Needle",
  latitude: 47.6205131,
  longitude: -122.3493036,
  sourcePlaceId: "gmaps:0xdb2ba8689ed0920d",
  sourceUrl:
    "https://www.google.com/maps/place/Space+Needle/data=!4m2!3m1!1s0x5490151f4ed5b7f9:0xdb2ba8689ed0920d",
  locationSource: "saved:Washington State",
} as const satisfies Location
