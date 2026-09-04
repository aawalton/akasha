import type { Location } from "../location.page-type.ts"

export const theTacoStand = {
  id: "019f1aec-0e58-749b-957c-c72e3a555475",
  pageTypeSlug: "location",
  slug: "the-taco-stand",
  title: "The Taco Stand",
  latitude: 32.8249488,
  longitude: -117.1558835,
  sourcePlaceId: "gmaps:0x73529c9f616b883",
  sourceUrl:
    "https://www.google.com/maps/place/The+Taco+Stand/data=!4m2!3m1!1s0x80dc03e5d1618ceb:0x73529c9f616b883",
  locationSource: "saved:CA, San Diego",
} as const satisfies Location
