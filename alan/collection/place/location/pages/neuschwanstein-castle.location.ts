import type { Location } from "akasha/alan/collection/place/location/location.page-type.types.ts"

export const neuschwansteinCastle = {
  id: "019f1aec-0efb-7549-8be0-15fdc1233558",
  type: "page-type/location",
  slug: "neuschwanstein-castle",
  title: "Neuschwanstein Castle",
  latitude: 47.5575522,
  longitude: 10.7496959,
  sourcePlaceId: "gmaps:0xc8a6866bd39dbba3",
  sourceUrl:
    "https://www.google.com/maps/place/Neuschwanstein+Castle/data=!4m2!3m1!1s0x479cf7cac44ea35d:0xc8a6866bd39dbba3",
  locationSource: "saved:Germany",
  createdAt: "2026-06-30T23:45:05.787Z",
  updatedAt: "2026-09-15T17:21:15.000Z",
} as const satisfies Location
