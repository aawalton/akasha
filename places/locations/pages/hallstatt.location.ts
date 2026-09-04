import type { Location } from "../location.page-type.ts"

export const hallstatt = {
  id: "019f1aec-0f1f-7ce3-9077-197a099c486a",
  pageTypeSlug: "location",
  slug: "hallstatt",
  title: "Hallstatt",
  latitude: 47.5347939,
  longitude: 13.5988875,
  notes: "Instagram. A town like Arendel from frozen.",
  sourcePlaceId: "gmaps:0x16c165596a26c1ad",
  sourceUrl:
    "https://www.google.com/maps/place/Hallstatt/data=!4m2!3m1!1s0x4771366f6e414663:0x16c165596a26c1ad",
  locationSource: "saved:Austria",
} as const satisfies Location
