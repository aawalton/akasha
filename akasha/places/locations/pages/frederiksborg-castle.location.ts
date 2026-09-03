import type { Location } from "../location.page-type.ts"

export const frederiksborgCastle = {
  id: "019f1aec-0d96-7546-9995-d83fefdb16b4",
  pageTypeSlug: "location",
  slug: "frederiksborg-castle",
  title: "Frederiksborg Castle",
  latitude: 55.9277451,
  longitude: 12.3108551,
  notes: "Picturesque",
  sourcePlaceId: "gmaps:0x12c6a634246b6152",
  sourceUrl:
    "https://www.google.com/maps/place/Frederiksborg+Castle/data=!4m2!3m1!1s0x46524097762941e1:0x12c6a634246b6152",
  locationSource: "saved:Denmark",
} as const satisfies Location
