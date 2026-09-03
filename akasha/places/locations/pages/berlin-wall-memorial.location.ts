import type { Location } from "../location.page-type.ts"

export const berlinWallMemorial = {
  id: "019f1aec-0d5f-7379-b8c7-eee3e41eff6f",
  pageTypeSlug: "location",
  slug: "berlin-wall-memorial",
  title: "Berlin Wall Memorial",
  latitude: 52.5375133,
  longitude: 13.3946755,
  sourcePlaceId: "gmaps:0xea53fe8afbc1b1ac",
  sourceUrl:
    "https://www.google.com/maps/place/Berlin+Wall+Memorial/data=!4m2!3m1!1s0x47a851f217b14267:0xea53fe8afbc1b1ac",
  locationSource: "saved:Berlin, Germany",
} as const satisfies Location
