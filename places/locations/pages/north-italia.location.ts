import type { Location } from "../location.page-type.ts"

export const northItalia = {
  id: "019f1aec-0ce7-7336-9a65-eadbf1bc732a",
  pageTypeSlug: "location",
  slug: "north-italia",
  title: "North Italia",
  latitude: 33.8478553,
  longitude: -84.3637252,
  sourcePlaceId: "gmaps:0x54197f4f9fd94bf3",
  sourceUrl:
    "https://www.google.com/maps/place/North+Italia/data=!4m2!3m1!1s0x8752852080cddfa9:0x54197f4f9fd94bf3",
  locationSource: "saved:Want to go",
} as const satisfies Location
