import type { Location } from "../location.page-type.ts"

export const apeCave = {
  id: "019f1aec-0c97-7fa6-bc3c-43f996dcbbb0",
  pageTypeSlug: "location",
  slug: "ape-cave",
  title: "Ape Cave",
  latitude: 46.1138476,
  longitude: -122.2139702,
  sourcePlaceId: "gmaps:0x44648837f87f7cf2",
  sourceUrl:
    "https://www.google.com/maps/place/Ape+Cave/data=!4m2!3m1!1s0x54969d382249a5af:0x44648837f87f7cf2",
  locationSource: "saved:Washington State",
} as const satisfies Location
