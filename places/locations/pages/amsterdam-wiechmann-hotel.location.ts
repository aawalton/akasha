import type { Location } from "../location.page-type.ts"

export const amsterdamWiechmannHotel = {
  id: "019f1aec-0e29-7068-9202-6915fe9b73ad",
  pageTypeSlug: "location",
  slug: "amsterdam-wiechmann-hotel",
  title: "Amsterdam Wiechmann Hotel",
  latitude: 52.3690026,
  longitude: 4.882228,
  notes: "Our hotel",
  sourcePlaceId: "gmaps:0x3feed05244b489aa",
  sourceUrl:
    "https://www.google.com/maps/place/Amsterdam+Wiechmann+Hotel/data=!4m2!3m1!1s0x47c609c2ce573ed7:0x3feed05244b489aa",
  locationSource: "saved:Netherlands",
} as const satisfies Location
