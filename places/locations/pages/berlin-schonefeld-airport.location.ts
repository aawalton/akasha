import type { Location } from "../location.page-type.ts"

export const berlinSchonefeldAirport = {
  id: "019f1b49-52fc-7329-8a83-604fc779bc49",
  pageTypeSlug: "location",
  slug: "berlin-schonefeld-airport",
  title: "Berlin Schönefeld Airport",
  latitude: 52.38,
  longitude: 13.5225,
  sourcePlaceId: "gmaps:0x34ff19458be0a4c0",
  sourceUrl:
    "https://www.google.com/maps/place/Berlin+Sch%C3%B6nefeld+Airport/data=!4m2!3m1!1s0x47a8385c00000001:0x34ff19458be0a4c0",
  locationSource: "saved:Berlin, Germany",
} as const satisfies Location
