import type { Location } from "../location.page-type.ts"

export const grandPlace = {
  id: "019f1aec-0ed3-7219-89d5-4309018672dc",
  pageTypeSlug: "location",
  slug: "grand-place",
  title: "Grand Place",
  latitude: 50.8467291,
  longitude: 4.3524081,
  notes: "So impressive!",
  sourcePlaceId: "gmaps:0xb03c355d8fe2cfb6",
  sourceUrl:
    "https://www.google.com/maps/place/Grand+Place/data=!4m2!3m1!1s0x47c3c47f4614f1f1:0xb03c355d8fe2cfb6",
  locationSource: "saved:Belgium",
} as const satisfies Location
