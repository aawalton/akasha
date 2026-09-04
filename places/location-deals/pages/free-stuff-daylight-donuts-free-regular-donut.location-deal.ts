import type { LocationDeal } from "../location-deal.page-type.ts"

export const freeStuffDaylightDonutsFreeRegularDonut = {
  id: "019f322c-a025-7384-99a2-fa3b8a09aa2c",
  pageTypeSlug: "location-deal",
  slug: "free-stuff-daylight-donuts-free-regular-donut",
  title: "Daylight Donuts — FREE! Regular Donut!",
  collection: "starving-student-card",
  dealKey: "ssc:free-stuff:daylight-donuts:free-regular-donut",
  finePrint: "Saratoga Springs",
  locations: ["daylight-donuts-saratoga-springs"],
  offerText: "FREE! Regular Donut!",
  offerType: "free",
  section: "Free Stuff",
  struckOut: false,
  useLimit: "1",
  usesUsed: 0,
} as const satisfies LocationDeal
