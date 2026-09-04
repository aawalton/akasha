import type { Location } from "../location.page-type.ts"

export const labeaus = {
  id: "019f1b49-57ac-78e1-aeeb-3c6ba39d20a5",
  pageTypeSlug: "location",
  slug: "labeaus",
  title: "LaBeau's",
  latitude: 39.297962,
  longitude: -106.417588,
  notes: "Shakes",
  sourcePlaceId: "gmaps:0x81888a8481759e50",
  sourceUrl:
    "https://www.google.com/maps/place/LaBeau's/data=!4m2!3m1!1s0x875413ce6c499c75:0x81888a8481759e50",
  locationSource: "saved:Bear Lake - Garden City",
} as const satisfies Location
