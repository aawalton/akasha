import type { Location } from "../location.page-type.ts"

export const lisbonCathedral = {
  id: "019f1aec-0ec6-7609-87fb-8efca5cfdc9f",
  pageTypeSlug: "location",
  slug: "lisbon-cathedral",
  title: "Lisbon Cathedral",
  latitude: 38.7098185,
  longitude: -9.1328001,
  sourcePlaceId: "gmaps:0x926e1d1ce1b76219",
  sourceUrl:
    "https://www.google.com/maps/place/Lisbon+Cathedral/data=!4m2!3m1!1s0xd1934773e51dc9b:0x926e1d1ce1b76219",
  locationSource: "saved:Lisbon, Portugal",
} as const satisfies Location
