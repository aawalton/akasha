import type { LocationDeal } from "../location-deal.page-type.ts"

export const freeStuffParlorDoughnutsFreeCarnivalDoughnut = {
  id: "019f322c-a1a7-7d35-a308-ed2460588fee",
  pageTypeSlug: "location-deal",
  slug: "free-stuff-parlor-doughnuts-free-carnival-doughnut",
  title: "Parlor Doughnuts — FREE! Carnival Doughnut!",
  collection: "starving-student-card",
  dealKey: "ssc:free-stuff:parlor-doughnuts:free-carnival-doughnut",
  locations: ["parlor-doughnuts-utah-county"],
  offerText: "FREE! Carnival Doughnut!",
  offerType: "free",
  section: "Free Stuff",
  struckOut: false,
  useLimit: "1",
  usesUsed: 1,
} as const satisfies LocationDeal
