import type { Location } from "../location.page-type.ts"

export const denverBotanicGardens = {
  id: "019f1aec-0d46-78db-9dc9-101b9ff90fa9",
  pageTypeSlug: "location",
  slug: "denver-botanic-gardens",
  title: "Denver Botanic Gardens",
  latitude: 39.7320369,
  longitude: -104.9616402,
  sourcePlaceId: "gmaps:0x401bdfcb1ed16e1a",
  sourceUrl:
    "https://www.google.com/maps/place/Denver+Botanic+Gardens/data=!4m2!3m1!1s0x876c7eb83b813ed1:0x401bdfcb1ed16e1a",
  locationSource: "saved:Want to go",
} as const satisfies Location
