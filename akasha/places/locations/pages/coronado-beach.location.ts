import type { Location } from "../location.page-type.ts"

export const coronadoBeach = {
  id: "019f1aec-0e50-7a1a-b79a-97479143a0de",
  pageTypeSlug: "location",
  slug: "coronado-beach",
  title: "Coronado Beach",
  latitude: 32.6831259,
  longitude: -117.1858699,
  notes: "The beach looks like glitter because of Mica from the mountains in Mexico.",
  sourcePlaceId: "gmaps:0x11b91f6167735576",
  sourceUrl:
    "https://www.google.com/maps/place/Coronado+Beach/data=!4m2!3m1!1s0x80deacc6539184dd:0x11b91f6167735576",
  locationSource: "saved:CA, San Diego",
} as const satisfies Location
