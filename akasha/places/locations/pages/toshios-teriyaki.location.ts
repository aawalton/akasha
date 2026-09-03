import type { Location } from "../location.page-type.ts"

export const toshiosTeriyaki = {
  id: "019f1aec-0c6e-72e4-a8c0-74ca9ffb3a8a",
  pageTypeSlug: "location",
  slug: "toshios-teriyaki",
  title: "Toshio's Teriyaki",
  latitude: 47.5881984,
  longitude: -122.3054558,
  notes: "Teriyaki chicken",
  sourcePlaceId: "gmaps:0xc871b979a7a39478",
  sourceUrl:
    "https://www.google.com/maps/place/Toshio's+Teriyaki/data=!4m2!3m1!1s0x54906a8d94364fb9:0xc871b979a7a39478",
  locationSource: "saved:Washington State",
} as const satisfies Location
