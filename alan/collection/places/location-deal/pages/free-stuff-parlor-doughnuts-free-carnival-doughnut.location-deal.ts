import type { LocationDeal } from "akasha/alan/collection/places/location-deal/location-deal.page-type.types.ts"

export const freeStuffParlorDoughnutsFreeCarnivalDoughnut = {
  id: "019f322c-a1a7-7d35-a308-ed2460588fee",
  type: "location-deal",
  slug: "free-stuff-parlor-doughnuts-free-carnival-doughnut",
  title: "Parlor Doughnuts — FREE! Carnival Doughnut!",
  collection: "location-collection/starving-student-card",
  dealKey: "ssc:free-stuff:parlor-doughnuts:free-carnival-doughnut",
  locations: ["location/parlor-doughnuts-utah-county"],
  offerText: "FREE! Carnival Doughnut!",
  offerType: "free",
  section: "Free Stuff",
  struckOut: false,
  useLimit: "1",
  usesUsed: 1,
} as const satisfies LocationDeal
