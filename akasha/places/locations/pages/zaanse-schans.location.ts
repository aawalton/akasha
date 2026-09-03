import type { Location } from "../location.page-type.ts"

export const zaanseSchans = {
  id: "019f1aec-0e25-7198-b708-0e548943a961",
  pageTypeSlug: "location",
  slug: "zaanse-schans",
  title: "Zaanse Schans",
  latitude: 52.4750534,
  longitude: 4.8179761,
  notes: "Windmill town with clog and barrel museum",
  sourcePlaceId: "gmaps:0x8b2f4837e2ca20fe",
  sourceUrl:
    "https://www.google.com/maps/place/Zaanse+Schans/data=!4m2!3m1!1s0x47c5fcf7bec1145b:0x8b2f4837e2ca20fe",
  locationSource: "saved:Netherlands",
} as const satisfies Location
