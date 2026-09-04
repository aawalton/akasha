import type { Location } from "../location.page-type.ts"

export const veniceBeach = {
  id: "019f1aec-0f03-745d-a0e5-ef57f99da9a9",
  pageTypeSlug: "location",
  slug: "venice-beach",
  title: "Venice Beach",
  latitude: 27.0999943,
  longitude: -82.4594485,
  notes: "Can find shark teeth here!",
  sourcePlaceId: "gmaps:0xc28c6e991ae2df2f",
  sourceUrl:
    "https://www.google.com/maps/place/Venice+Beach/data=!4m2!3m1!1s0x80c2babbc9718da5:0xc28c6e991ae2df2f",
  locationSource: "saved:Florida",
} as const satisfies Location
