import type { Location } from "../location.page-type.ts"

export const louvreMuseum = {
  id: "019f1aec-0dd6-7729-8a7a-66cc0c105276",
  pageTypeSlug: "location",
  slug: "louvre-museum",
  title: "Louvre Museum",
  latitude: 48.8611473,
  longitude: 2.3380277,
  sourcePlaceId: "gmaps:0xb975fcfa192f84d4",
  sourceUrl:
    "https://www.google.com/maps/place/Louvre+Museum/data=!4m2!3m1!1s0x47e671d877937b0f:0xb975fcfa192f84d4",
  locationSource: "saved:Paris, France",
} as const satisfies Location
