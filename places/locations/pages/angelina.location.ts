import type { Location } from "../location.page-type.ts"

export const angelina = {
  id: "019f1aec-0dcf-7e31-b040-abb0d28fe381",
  pageTypeSlug: "location",
  slug: "angelina",
  title: "Angelina",
  latitude: 48.8650778,
  longitude: 2.3284104,
  sourcePlaceId: "gmaps:0x9a5acce46d18ec98",
  sourceUrl:
    "https://www.google.com/maps/place/Angelina/data=!4m2!3m1!1s0x47e671d4ee71d57b:0x9a5acce46d18ec98",
  locationSource: "saved:Paris, France",
} as const satisfies Location
