import type { Location } from "../location.page-type.ts"

export const evasBakery = {
  id: "019f1b49-54c5-7292-824e-6d32bd78b8e2",
  pageTypeSlug: "location",
  slug: "evas-bakery",
  title: "Eva's Bakery",
  latitude: 40.7657223,
  longitude: -111.890825,
  notes: "Cool french bakery",
  sourcePlaceId: "gmaps:0x8657d6e1431157b",
  sourceUrl:
    "https://www.google.com/maps/place/Eva's+Bakery/data=!4m2!3m1!1s0x8752f50f0d344c09:0x8657d6e1431157b",
  locationSource: "saved:UT, SLC",
} as const satisfies Location
