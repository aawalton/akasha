import type { Location } from "akasha/alan/collection/place/location/location.page-type.types.ts"

export const maisonKuntz = {
  id: "019f1b49-540b-7960-84b6-8378c8c50e98",
  type: "page-type/location",
  slug: "maison-kuntz",
  title: "Maison Kuntz",
  latitude: 48.8628006,
  longitude: 2.273891,
  notes: "Recommended by cake by Courtney",
  sourcePlaceId: "gmaps:0x16a305f233b2cbd8",
  sourceUrl:
    "https://www.google.com/maps/place/Maison+Kuntz/data=!4m2!3m1!1s0x47e665569ce79199:0x16a305f233b2cbd8",
  locationSource: "saved:Paris, France",
  createdAt: "2026-07-01T01:26:58.315Z",
  updatedAt: "2026-09-15T17:21:15.000Z",
} as const satisfies Location
