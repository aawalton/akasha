import type { Location } from "../location.page-type.ts"

export const boroughMarket = {
  id: "019f1aec-0e75-7a64-811a-5fe47f56a260",
  pageTypeSlug: "location",
  slug: "borough-market",
  title: "Borough Market",
  latitude: 51.5055815,
  longitude: -0.0901984,
  notes: "Try chocolate strawberry cup. Line moves fast.",
  sourcePlaceId: "gmaps:0x3128e7e59ca044b9",
  sourceUrl:
    "https://www.google.com/maps/place/Borough+Market/data=!4m2!3m1!1s0x4876035775cf660f:0x3128e7e59ca044b9",
  locationSource: "saved:London, England",
} as const satisfies Location
