import type { Location } from "../location.page-type.ts"

export const dasCafe = {
  id: "019f1aec-0cc2-740d-9b09-69187766cdb5",
  pageTypeSlug: "location",
  slug: "das-cafe",
  title: "Das Café",
  latitude: 48.2042559,
  longitude: 16.3550317,
  sourcePlaceId: "gmaps:0x5b5e94c3213ec8ef",
  sourceUrl:
    "https://www.google.com/maps/place/Das+Caf%C3%A9/data=!4m2!3m1!1s0x874c6ca10824f421:0x5b5e94c3213ec8ef",
  locationSource: "saved:Want to go",
} as const satisfies Location
