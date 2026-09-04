import type { Location } from "../location.page-type.ts"

export const parqueDeLasPalapas = {
  id: "019f1b49-52df-7978-b665-ee36aacb324a",
  pageTypeSlug: "location",
  slug: "parque-de-las-palapas",
  title: "Parque de las Palapas",
  latitude: 21.1527467,
  longitude: -86.8425761,
  notes: "Patrick recommended tacos here",
  sourcePlaceId: "gmaps:0x1a0a54df0bd2c1b9",
  sourceUrl:
    "https://www.google.com/maps/place/Parque+de+las+Palapas/data=!4m2!3m1!1s0x8f4c2c0737a9f0ab:0x1a0a54df0bd2c1b9",
  locationSource: "saved:Cancun, Mexico",
} as const satisfies Location
