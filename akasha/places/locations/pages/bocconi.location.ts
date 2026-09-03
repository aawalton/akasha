import type { Location } from "../location.page-type.ts"

export const bocconi = {
  id: "019f1aec-0ed4-764e-b2de-5b02db44f944",
  pageTypeSlug: "location",
  slug: "bocconi",
  title: "Bocconi",
  latitude: 50.8460119,
  longitude: 4.3513055,
  notes: "Recommend by Sara at Hilton (who’s from Italy)",
  sourcePlaceId: "gmaps:0x7185aeb80ab481e6",
  sourceUrl:
    "https://www.google.com/maps/place/Bocconi/data=!4m2!3m1!1s0x47c3c478cdd61231:0x7185aeb80ab481e6",
  locationSource: "saved:Belgium",
} as const satisfies Location
