import type { Location } from "../location.page-type.ts"

export const gewoonGouds = {
  id: "019f1aec-0e22-7996-907f-63c624e8e24c",
  pageTypeSlug: "location",
  slug: "gewoon-gouds",
  title: "Gewoon Gouds",
  latitude: 52.012327,
  longitude: 4.7103465,
  notes: "Divine cheese soup!",
  sourcePlaceId: "gmaps:0x33b6c47e8b7ac7da",
  sourceUrl:
    "https://www.google.com/maps/place/Gewoon+Gouds/data=!4m2!3m1!1s0x47c5d40278015561:0x33b6c47e8b7ac7da",
  locationSource: "saved:Netherlands",
} as const satisfies Location
