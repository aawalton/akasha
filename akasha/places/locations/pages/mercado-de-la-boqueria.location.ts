import type { Location } from "../location.page-type.ts"

export const mercadoDeLaBoqueria = {
  id: "019f1b49-55c3-7af4-b5e7-4d5869daf2d4",
  pageTypeSlug: "location",
  slug: "mercado-de-la-boqueria",
  title: "Mercado de La Boqueria",
  latitude: 39.4617322,
  longitude: -0.3839662,
  sourcePlaceId: "gmaps:0x860ac654dc73add5",
  sourceUrl:
    "https://www.google.com/maps/place/Mercado+de+La+Boqueria/data=!4m2!3m1!1s0x12a4a2f7b51e5a01:0x860ac654dc73add5",
  locationSource: "saved:Barcelona, Spain",
} as const satisfies Location
