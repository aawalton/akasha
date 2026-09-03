import type { Location } from "../location.page-type.ts"

export const museeDorsay = {
  id: "019f1aec-0dc5-740b-b348-f5625ef1745e",
  pageTypeSlug: "location",
  slug: "musee-dorsay",
  title: "Musée d'Orsay",
  latitude: 48.8599179,
  longitude: 2.3265849,
  notes: "Has Monet paintings",
  sourcePlaceId: "gmaps:0xd071bd8cb14423d8",
  sourceUrl:
    "https://www.google.com/maps/place/Mus%C3%A9e+d'Orsay/data=!4m2!3m1!1s0x47e66e2bb630941b:0xd071bd8cb14423d8",
  locationSource: "saved:Paris, France",
} as const satisfies Location
