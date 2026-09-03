import type { Location } from "../location.page-type.ts"

export const palaceOfVersailles = {
  id: "019f1b49-5443-7e7e-b218-d4419ec726f0",
  pageTypeSlug: "location",
  slug: "palace-of-versailles",
  title: "Palace of Versailles",
  latitude: 48.8109913,
  longitude: 2.1204254,
  sourcePlaceId: "gmaps:0x538fcc15f59ce8f",
  sourceUrl:
    "https://www.google.com/maps/place/Palace+of+Versailles/data=!4m2!3m1!1s0x47e67d94d7b14c75:0x538fcc15f59ce8f",
  locationSource: "saved:Paris, France",
} as const satisfies Location
