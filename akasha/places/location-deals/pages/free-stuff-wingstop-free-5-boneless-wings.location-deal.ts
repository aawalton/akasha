import type { LocationDeal } from "../location-deal.page-type.ts"

export const freeStuffWingstopFree5BonelessWings = {
  id: "019f322c-a401-79f2-be98-86e81f93342e",
  pageTypeSlug: "location-deal",
  slug: "free-stuff-wingstop-free-5-boneless-wings",
  title: "Wingstop — FREE! 5 Boneless Wings!",
  collection: "starving-student-card",
  dealKey: "ssc:free-stuff:wingstop:free-5-boneless-wings",
  finePrint: "All Northern UT locations",
  locations: ["wingstop-utah-county"],
  offerText: "FREE! 5 Boneless Wings!",
  offerType: "free",
  section: "Free Stuff",
  struckOut: false,
  useLimit: "1",
  usesUsed: 0,
} as const satisfies LocationDeal
