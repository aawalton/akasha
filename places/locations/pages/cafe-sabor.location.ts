import type { Location } from "../location.page-type.ts"

export const cafeSabor = {
  id: "019f1b49-57a9-7999-8ecd-d4a7a715256e",
  pageTypeSlug: "location",
  slug: "cafe-sabor",
  title: "Cafe Sabor",
  latitude: 39.297962,
  longitude: -106.417588,
  notes: "Enchiladas",
  sourcePlaceId: "gmaps:0x42c14cf374c308d7",
  sourceUrl:
    "https://www.google.com/maps/place/Cafe+Sabor/data=!4m2!3m1!1s0x8754144142a6dd91:0x42c14cf374c308d7",
  locationSource: "saved:Bear Lake - Garden City",
} as const satisfies Location
