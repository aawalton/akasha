import type { Location } from "../location.page-type.ts"

export const swadCabin = {
  id: "019f1aec-0cdc-7c7b-a845-359a6eefdef5",
  pageTypeSlug: "location",
  slug: "swad-cabin",
  title: "Swad Cabin",
  latitude: 40.0985333,
  longitude: -111.6143456,
  notes: "Recommended by Instagram",
  sourcePlaceId: "gmaps:0xda6b79e39cedb0fa",
  sourceUrl:
    "https://www.google.com/maps/place/Swad+Cabin/data=!4m2!3m1!1s0x874dbd5cc77c7cc5:0xda6b79e39cedb0fa",
  locationSource: "saved:Want to go",
} as const satisfies Location
