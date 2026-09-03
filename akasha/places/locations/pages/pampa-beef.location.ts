import type { Location } from "../location.page-type.ts"

export const pampaBeef = {
  id: "019f1aec-0d65-7692-956a-3b9aa77d17ec",
  pageTypeSlug: "location",
  slug: "pampa-beef",
  title: "Pampa Beef",
  latitude: 40.4162921,
  longitude: -3.700318,
  notes: "Got steak here.",
  sourcePlaceId: "gmaps:0x2d06fafffcadf282",
  sourceUrl:
    "https://www.google.com/maps/place/Pampa+Beef/data=!4m2!3m1!1s0xd4228811d794009:0x2d06fafffcadf282",
  locationSource: "saved:Madrid, Spain",
} as const satisfies Location
