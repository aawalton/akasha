import type { LocationDeal } from "akasha/alan/collection/place/location-deal/location-deal.page-type.types.ts"

export const freeStuffDaylightDonutsFreeRegularDonut = {
  id: "019f322c-a025-7384-99a2-fa3b8a09aa2c",
  type: "page-type/location-deal",
  slug: "free-stuff-daylight-donuts-free-regular-donut",
  title: "Daylight Donuts — FREE! Regular Donut!",
  collection: "location-collection/starving-student-card",
  dealKey: "ssc:free-stuff:daylight-donuts:free-regular-donut",
  finePrint: "Saratoga Springs",
  locations: ["location/daylight-donuts-saratoga-springs"],
  offerText: "FREE! Regular Donut!",
  offerType: "free",
  section: "Free Stuff",
  struckOut: false,
  useLimit: "1",
  usesUsed: 0,
} as const satisfies LocationDeal
