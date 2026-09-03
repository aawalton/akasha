import type { Location } from "../location.page-type.ts"

export const seattleWashingtonTemple = {
  id: "019f1aec-0cab-7936-ada1-f4f776877474",
  pageTypeSlug: "location",
  slug: "seattle-washington-temple",
  title: "Seattle Washington Temple",
  latitude: 47.5840664,
  longitude: -122.1409493,
  sourcePlaceId: "gmaps:0x2b9193587e9dffa",
  sourceUrl:
    "https://www.google.com/maps/place/Seattle+Washington+Temple/data=!4m2!3m1!1s0x54906e9f85ad6089:0x2b9193587e9dffa",
  locationSource: "saved:Washington State",
} as const satisfies Location
