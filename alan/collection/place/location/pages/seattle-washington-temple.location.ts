import type { Location } from "akasha/alan/collection/place/location/location.page-type.types.ts"

export const seattleWashingtonTemple = {
  id: "019f1aec-0cab-7936-ada1-f4f776877474",
  type: "page-type/location",
  slug: "seattle-washington-temple",
  title: "Seattle Washington Temple",
  latitude: 47.5840664,
  longitude: -122.1409493,
  sourcePlaceId: "gmaps:0x2b9193587e9dffa",
  sourceUrl:
    "https://www.google.com/maps/place/Seattle+Washington+Temple/data=!4m2!3m1!1s0x54906e9f85ad6089:0x2b9193587e9dffa",
  locationSource: "saved:Washington State",
  createdAt: "2026-06-30T23:45:05.195Z",
  updatedAt: "2026-09-15T17:21:46.000Z",
} as const satisfies Location
