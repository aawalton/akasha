import type { Location } from "../location.page-type.ts"

export const deliceBakeryCafe = {
  id: "019f1aec-0d33-760d-82bf-22224107c699",
  pageTypeSlug: "location",
  slug: "delice-bakery-cafe",
  title: "Délice Bakery & Café",
  latitude: -6.9248412,
  longitude: 107.621374,
  notes: "French bakery",
  sourcePlaceId: "gmaps:0xeea9cf17e3be239d",
  sourceUrl:
    "https://www.google.com/maps/place/D%C3%A9lice+Bakery+%26+Caf%C3%A9/data=!4m2!3m1!1s0x87528b18dd92719f:0xeea9cf17e3be239d",
  locationSource: "saved:Want to go",
} as const satisfies Location
