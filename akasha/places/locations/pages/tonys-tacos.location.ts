import type { Location } from "../location.page-type.ts"

export const tonysTacos = {
  id: "019f1b49-52e8-77ee-b432-87ce5efbeb12",
  pageTypeSlug: "location",
  slug: "tonys-tacos",
  title: "Tony's Tacos",
  latitude: 52.5517974,
  longitude: 13.414541,
  sourcePlaceId: "gmaps:0x6e6ef15330edab2b",
  sourceUrl:
    "https://www.google.com/maps/place/Tony's+Tacos/data=!4m2!3m1!1s0x874df59022322743:0x6e6ef15330edab2b",
  locationSource: "saved:Berlin, Germany",
} as const satisfies Location
