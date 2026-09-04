import type { Location } from "../location.page-type.ts"

export const grandOleOpry = {
  id: "019f1aec-0df3-7100-abc9-27be2b270972",
  pageTypeSlug: "location",
  slug: "grand-ole-opry",
  title: "Grand Ole Opry",
  latitude: 36.2069577,
  longitude: -86.6918054,
  sourcePlaceId: "gmaps:0x277ee7b8e17cec75",
  sourceUrl:
    "https://www.google.com/maps/place/Grand+Ole+Opry/data=!4m2!3m1!1s0x886469cff7602a55:0x277ee7b8e17cec75",
  locationSource: "saved:Nashville, Tennessee",
} as const satisfies Location
