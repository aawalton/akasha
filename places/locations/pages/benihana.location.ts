import type { Location } from "../location.page-type.ts"

export const benihana = {
  id: "019f1b49-54d8-7d75-b9d3-9efa23d42bcf",
  pageTypeSlug: "location",
  slug: "benihana",
  title: "Benihana",
  latitude: 33.9955104,
  longitude: -117.9142928,
  notes: "To try",
  sourcePlaceId: "gmaps:0x8ba6679a2ee9b20a",
  sourceUrl:
    "https://www.google.com/maps/place/Benihana/data=!4m2!3m1!1s0x8752f5058c5ab889:0x8ba6679a2ee9b20a",
  locationSource: "saved:UT, SLC",
} as const satisfies Location
