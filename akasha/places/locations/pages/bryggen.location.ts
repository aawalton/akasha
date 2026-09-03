import type { Location } from "../location.page-type.ts"

export const bryggen = {
  id: "019f1aec-0edf-7d44-b0f9-f33714c34cb8",
  pageTypeSlug: "location",
  slug: "bryggen",
  title: "Bryggen",
  latitude: 60.3977257,
  longitude: 5.3229328,
  notes: "Harbor",
  sourcePlaceId: "gmaps:0xf278657d7d75232e",
  sourceUrl:
    "https://www.google.com/maps/place/Bryggen/data=!4m2!3m1!1s0x463cfc1d80be31e1:0xf278657d7d75232e",
  locationSource: "saved:Norway",
} as const satisfies Location
