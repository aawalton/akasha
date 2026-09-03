import type { Location } from "../location.page-type.ts"

export const edinburghCastle = {
  id: "019f1aec-0e8e-7b7f-9b4d-2b65d90d45cb",
  pageTypeSlug: "location",
  slug: "edinburgh-castle",
  title: "Edinburgh Castle",
  latitude: 55.9486884,
  longitude: -3.2004184,
  sourcePlaceId: "gmaps:0x469a1eebe54c0a58",
  sourceUrl:
    "https://www.google.com/maps/place/Edinburgh+Castle/data=!4m2!3m1!1s0x4887c79a2099c0f7:0x469a1eebe54c0a58",
  locationSource: "saved:Scotland",
} as const satisfies Location
