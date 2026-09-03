import type { Location } from "../location.page-type.ts"

export const mooseBuns = {
  id: "019f1b49-57ab-712f-ad33-e1a5f3fecd31",
  pageTypeSlug: "location",
  slug: "moose-buns",
  title: "Moose Buns",
  latitude: 39.297962,
  longitude: -106.417588,
  sourcePlaceId: "gmaps:0x87a020fe5aa3e91f",
  sourceUrl:
    "https://www.google.com/maps/place/Moose+Buns/data=!4m2!3m1!1s0x87541355a660e375:0x87a020fe5aa3e91f",
  locationSource: "saved:Bear Lake - Garden City",
} as const satisfies Location
