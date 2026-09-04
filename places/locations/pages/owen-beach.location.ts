import type { Location } from "../location.page-type.ts"

export const owenBeach = {
  id: "019f1aec-0c76-7e35-9aff-f15b0668b3d3",
  pageTypeSlug: "location",
  slug: "owen-beach",
  title: "Owen Beach",
  latitude: 47.3123338,
  longitude: -122.52715,
  sourcePlaceId: "gmaps:0xdf518fbdeabf51dc",
  sourceUrl:
    "https://www.google.com/maps/place/Owen+Beach/data=!4m2!3m1!1s0x5490530cf2532fff:0xdf518fbdeabf51dc",
  locationSource: "saved:Washington State",
} as const satisfies Location
