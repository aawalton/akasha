import type { Location } from "../location.page-type.ts"

export const shell = {
  id: "019f1aec-0d76-7a93-830a-20e1e3c4650a",
  pageTypeSlug: "location",
  slug: "shell",
  title: "Shell",
  latitude: 55.942872,
  longitude: 11.8685392,
  notes: "Possible shipping location?",
  sourcePlaceId: "gmaps:0xa5b45d5f51a3834",
  sourceUrl:
    "https://www.google.com/maps/place/Shell/data=!4m2!3m1!1s0x464b719cef1c1067:0xa5b45d5f51a3834",
  locationSource: "saved:Denmark",
} as const satisfies Location
