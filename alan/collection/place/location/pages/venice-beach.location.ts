import type { Location } from "akasha/alan/collection/place/location/location.page-type.types.ts"

export const veniceBeach = {
  id: "019f1aec-0f03-745d-a0e5-ef57f99da9a9",
  type: "page-type/location",
  slug: "venice-beach",
  title: "Venice Beach",
  latitude: 27.0999943,
  longitude: -82.4594485,
  notes: "Can find shark teeth here!",
  sourcePlaceId: "gmaps:0xc28c6e991ae2df2f",
  sourceUrl:
    "https://www.google.com/maps/place/Venice+Beach/data=!4m2!3m1!1s0x80c2babbc9718da5:0xc28c6e991ae2df2f",
  locationSource: "saved:Florida",
  createdAt: "2026-06-30T23:45:05.795Z",
  updatedAt: "2026-09-15T17:22:08.000Z",
} as const satisfies Location
