import type { LocationDeal } from "../location-deal.page-type.ts"

export const freeStuffYogurtlandFreeFirst5OuncesOfYogurt = {
  id: "019f322c-a406-742d-ac46-9bdb74255a01",
  pageTypeSlug: "location-deal",
  slug: "free-stuff-yogurtland-free-first-5-ounces-of-yogurt",
  title: "Yogurtland — FREE! First 5 Ounces of Yogurt!",
  collection: "starving-student-card",
  dealKey: "ssc:free-stuff:yogurtland:free-first-5-ounces-of-yogurt",
  locations: ["yogurtland-utah-county"],
  offerText: "FREE! First 5 Ounces of Yogurt!",
  offerType: "free",
  section: "Free Stuff",
  struckOut: false,
  useLimit: "1",
  usesUsed: 0,
} as const satisfies LocationDeal
