import type { Location } from "../location.page-type.ts"

export const tilikumPlaceCafe = {
  id: "019f1aec-0ca3-7f6c-83e9-edb34e8c3610",
  pageTypeSlug: "location",
  slug: "tilikum-place-cafe",
  title: "Tilikum Place Cafe",
  latitude: 47.6179341,
  longitude: -122.3475939,
  notes: "Dutch baby pancakes",
  sourcePlaceId: "gmaps:0xb8dba873b8fad944",
  sourceUrl:
    "https://www.google.com/maps/place/Tilikum+Place+Cafe/data=!4m2!3m1!1s0x5490154f3b483be9:0xb8dba873b8fad944",
  locationSource: "saved:Washington State",
} as const satisfies Location
