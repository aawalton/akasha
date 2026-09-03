import type { Location } from "../location.page-type.ts"

export const museeDeLorangerie = {
  id: "019f1aec-0dc4-707c-8f0c-e1ab5f1bb3bd",
  pageTypeSlug: "location",
  slug: "musee-de-lorangerie",
  title: "Musée de l'Orangerie",
  latitude: 48.8637655,
  longitude: 2.3226602,
  notes: "Curved Monet Water Lily Paintings",
  sourcePlaceId: "gmaps:0xdc3fd08aa701960a",
  sourceUrl:
    "https://www.google.com/maps/place/Mus%C3%A9e+de+l'Orangerie/data=!4m2!3m1!1s0x47e66e2eeaaaaaa3:0xdc3fd08aa701960a",
  locationSource: "saved:Paris, France",
} as const satisfies Location
