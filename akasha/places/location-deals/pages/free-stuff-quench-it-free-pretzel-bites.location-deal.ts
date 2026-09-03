import type { LocationDeal } from "../location-deal.page-type.ts"

export const freeStuffQuenchItFreePretzelBites = {
  id: "019f322c-a267-7ee9-b9cf-b7c61903f47f",
  pageTypeSlug: "location-deal",
  slug: "free-stuff-quench-it-free-pretzel-bites",
  title: "Quench It! — FREE! Pretzel Bites!",
  collection: "starving-student-card",
  dealKey: "ssc:free-stuff:quench-it:free-pretzel-bites",
  finePrint: "All Ut County & Bluffdale",
  locations: ["quench-it-bluffdale"],
  offerText: "FREE! Pretzel Bites!",
  offerType: "free",
  section: "Free Stuff",
  struckOut: false,
  useLimit: "1",
  usesUsed: 0,
} as const satisfies LocationDeal
