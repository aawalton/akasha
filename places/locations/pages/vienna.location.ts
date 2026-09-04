import type { Location } from "../location.page-type.ts"

export const vienna = {
  id: "019f1aec-0f21-7179-9707-14eb72c0fe8d",
  pageTypeSlug: "location",
  slug: "vienna",
  title: "Vienna",
  latitude: 48.2083537,
  longitude: 16.3725042,
  notes: "Recommended by Melissa. Ask for her list of recommendations. She lived there.",
  sourcePlaceId: "gmaps:0xfdc2e58a51a25b46",
  sourceUrl:
    "https://www.google.com/maps/place/Vienna/data=!4m2!3m1!1s0x476d079e5136ca9f:0xfdc2e58a51a25b46",
  locationSource: "saved:Austria",
} as const satisfies Location
