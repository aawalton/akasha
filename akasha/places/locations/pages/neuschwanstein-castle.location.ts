import type { Location } from "../location.page-type.ts"

export const neuschwansteinCastle = {
  id: "019f1aec-0efb-7549-8be0-15fdc1233558",
  pageTypeSlug: "location",
  slug: "neuschwanstein-castle",
  title: "Neuschwanstein Castle",
  latitude: 47.5575522,
  longitude: 10.7496959,
  sourcePlaceId: "gmaps:0xc8a6866bd39dbba3",
  sourceUrl:
    "https://www.google.com/maps/place/Neuschwanstein+Castle/data=!4m2!3m1!1s0x479cf7cac44ea35d:0xc8a6866bd39dbba3",
  locationSource: "saved:Germany",
} as const satisfies Location
