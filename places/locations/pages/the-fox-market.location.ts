import type { Location } from "../location.page-type.ts"

export const theFoxMarket = {
  id: "019f1aec-0cf1-7d4a-a41f-bd5e5739db49",
  pageTypeSlug: "location",
  slug: "the-fox-market",
  title: "The Fox Market",
  latitude: 37.783207,
  longitude: -122.4173545,
  notes: "Recommended by Marquie. Has really good ice cream!",
  sourcePlaceId: "gmaps:0x599233454b4ffbdd",
  sourceUrl:
    "https://www.google.com/maps/place/The+Fox+Market/data=!4m2!3m1!1s0x87526374da8dbc49:0x599233454b4ffbdd",
  locationSource: "saved:Want to go",
} as const satisfies Location
