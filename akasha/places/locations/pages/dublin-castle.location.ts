import type { Location } from "../location.page-type.ts"

export const dublinCastle = {
  id: "019f1aec-0d63-70be-983a-2f23bc8ce575",
  pageTypeSlug: "location",
  slug: "dublin-castle",
  title: "Dublin Castle",
  latitude: 53.3426623,
  longitude: -6.2670042,
  sourcePlaceId: "gmaps:0x50fcdf6c0e15686",
  sourceUrl:
    "https://www.google.com/maps/place/Dublin+Castle/data=!4m2!3m1!1s0x48670e873566ff89:0x50fcdf6c0e15686",
  locationSource: "saved:Ireland",
} as const satisfies Location
