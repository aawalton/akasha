import type { Location } from "../location.page-type.ts"

export const laSagradaFamilia = {
  id: "019f1aec-0e74-7696-954d-dcf28547771f",
  pageTypeSlug: "location",
  slug: "la-sagrada-familia",
  title: "La Sagrada Familia",
  latitude: 41.4044407,
  longitude: 2.1748611,
  sourcePlaceId: "gmaps:0x9bd8aac21bc3c950",
  sourceUrl:
    "https://www.google.com/maps/place/La+Sagrada+Familia/data=!4m2!3m1!1s0x12a4a2dcd83dfb93:0x9bd8aac21bc3c950",
  locationSource: "saved:Barcelona, Spain",
} as const satisfies Location
