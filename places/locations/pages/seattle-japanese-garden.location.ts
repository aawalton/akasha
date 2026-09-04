import type { Location } from "../location.page-type.ts"

export const seattleJapaneseGarden = {
  id: "019f1b49-50c5-74d8-b5a8-e352523a17a3",
  pageTypeSlug: "location",
  slug: "seattle-japanese-garden",
  title: "Seattle Japanese Garden",
  latitude: 47.6095043,
  longitude: -122.3187983,
  sourcePlaceId: "gmaps:0x593103739ae3cd34",
  sourceUrl:
    "https://www.google.com/maps/place/Seattle+Japanese+Garden/data=!4m2!3m1!1s0x549014d242b57243:0x593103739ae3cd34",
  locationSource: "saved:Washington State",
} as const satisfies Location
