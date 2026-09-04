import type { Location } from "../location.page-type.ts"

export const laBrasiliana = {
  id: "019f1b49-5507-74f1-9205-3a044d9b612d",
  pageTypeSlug: "location",
  slug: "la-brasiliana",
  title: "La Brasiliana",
  latitude: 45.853742,
  longitude: 8.772756,
  sourcePlaceId: "gmaps:0x7cb634deb32a27ea",
  sourceUrl:
    "https://www.google.com/maps/place/La+Brasiliana/data=!4m2!3m1!1s0x477eb1d988d7b189:0x7cb634deb32a27ea",
  locationSource: "saved:Venice, Italy",
} as const satisfies Location
