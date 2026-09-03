import type { Location } from "../location.page-type.ts"

export const disneylandParis = {
  id: "019f1b49-541b-7e4d-aae7-e3472abdebd1",
  pageTypeSlug: "location",
  slug: "disneyland-paris",
  title: "Disneyland Paris",
  latitude: 48.86272,
  longitude: 2.34375,
  sourcePlaceId: "gmaps:0x57faf8cb6310e660",
  sourceUrl:
    "https://www.google.com/maps/place/Disneyland+Paris/data=!4m2!3m1!1s0x47e61d19ca7ae2bd:0x57faf8cb6310e660",
  locationSource: "saved:Paris, France",
} as const satisfies Location
