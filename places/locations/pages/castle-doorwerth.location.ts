import type { Location } from "../location.page-type.ts"

export const castleDoorwerth = {
  id: "019f1aec-0e2a-7471-a94a-8edee5d19c9d",
  pageTypeSlug: "location",
  slug: "castle-doorwerth",
  title: "Castle Doorwerth",
  latitude: 51.9667334,
  longitude: 5.7885275,
  notes: "Notable 13th century castle",
  sourcePlaceId: "gmaps:0xb3bec1731fa35a5e",
  sourceUrl:
    "https://www.google.com/maps/place/Castle+Doorwerth/data=!4m2!3m1!1s0x47c7aed280d6a173:0xb3bec1731fa35a5e",
  locationSource: "saved:Netherlands",
} as const satisfies Location
