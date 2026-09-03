import type { Location } from "../location.page-type.ts"

export const bergenStation = {
  id: "019f1aec-0ee6-7252-ac67-0a0b828e11f7",
  pageTypeSlug: "location",
  slug: "bergen-station",
  title: "Bergen Station",
  latitude: 60.390279,
  longitude: 5.3333972,
  sourcePlaceId: "gmaps:0xea77aacf71b645a2",
  sourceUrl:
    "https://www.google.com/maps/place/Bergen+Station/data=!4m2!3m1!1s0x463cfeaef2a46763:0xea77aacf71b645a2",
  locationSource: "saved:Norway",
} as const satisfies Location
