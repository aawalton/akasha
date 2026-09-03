import type { Location } from "../location.page-type.ts"

export const lakeBled = {
  id: "019f1aec-0f10-708b-a2f5-69b3b4ce0128",
  pageTypeSlug: "location",
  slug: "lake-bled",
  title: "Lake Bled",
  latitude: 46.3639132,
  longitude: 14.0938069,
  notes: "Recommended by Melissa.",
  sourcePlaceId: "gmaps:0x83cd8331dd0107ac",
  sourceUrl:
    "https://www.google.com/maps/place/Lake+Bled/data=!4m2!3m1!1s0x477a9139b9d9e421:0x83cd8331dd0107ac",
  locationSource: "saved:Slovenia",
} as const satisfies Location
