import type { Location } from "akasha/alan/collection/place/location/location.page-type.types.ts"

export const museeDeLorangerie = {
  id: "019f1aec-0dc4-707c-8f0c-e1ab5f1bb3bd",
  type: "page-type/location",
  slug: "musee-de-lorangerie",
  title: "Musée de l'Orangerie",
  latitude: 48.8637655,
  longitude: 2.3226602,
  notes: "Curved Monet Water Lily Paintings",
  sourcePlaceId: "gmaps:0xdc3fd08aa701960a",
  sourceUrl:
    "https://www.google.com/maps/place/Mus%C3%A9e+de+l'Orangerie/data=!4m2!3m1!1s0x47e66e2eeaaaaaa3:0xdc3fd08aa701960a",
  locationSource: "saved:Paris, France",
  createdAt: "2026-06-30T23:45:05.476Z",
  updatedAt: "2026-09-15T17:21:15.000Z",
} as const satisfies Location
