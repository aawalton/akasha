import type { Location } from "../location.page-type.ts"

export const rialtoBridge = {
  id: "019f1aec-0e20-705f-88be-ed15c029cb49",
  pageTypeSlug: "location",
  slug: "rialto-bridge",
  title: "Rialto Bridge",
  latitude: 45.4380688,
  longitude: 12.3356548,
  sourcePlaceId: "gmaps:0x732011a1298ecc89",
  sourceUrl:
    "https://www.google.com/maps/place/Rialto+Bridge/data=!4m2!3m1!1s0x477eb1c7faa33a3b:0x732011a1298ecc89",
  locationSource: "saved:Venice, Italy",
} as const satisfies Location
