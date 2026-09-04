import type { Location } from "../location.page-type.ts"

export const osloCathedral = {
  id: "019f1aec-0ee2-756f-a35b-32d3a8325889",
  pageTypeSlug: "location",
  slug: "oslo-cathedral",
  title: "Oslo Cathedral",
  latitude: 59.9125115,
  longitude: 10.747012,
  sourcePlaceId: "gmaps:0xb35270be6dddce4b",
  sourceUrl:
    "https://www.google.com/maps/place/Oslo+Cathedral/data=!4m2!3m1!1s0x46416e628755f369:0xb35270be6dddce4b",
  locationSource: "saved:Norway",
} as const satisfies Location
