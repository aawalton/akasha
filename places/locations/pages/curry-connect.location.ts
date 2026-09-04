import type { Location } from "../location.page-type.ts"

export const curryConnect = {
  id: "019f1aec-0ce9-795e-9711-0bc5ebcbc041",
  pageTypeSlug: "location",
  slug: "curry-connect",
  title: "Curry Connect",
  latitude: 40.5822402,
  longitude: -111.866618,
  notes: "Restaurant group",
  sourcePlaceId: "gmaps:0xb8e6b6539f9d1d75",
  sourceUrl:
    "https://www.google.com/maps/place/Curry+Connect/data=!4m2!3m1!1s0x87528776701ff615:0xb8e6b6539f9d1d75",
  locationSource: "saved:Want to go",
} as const satisfies Location
