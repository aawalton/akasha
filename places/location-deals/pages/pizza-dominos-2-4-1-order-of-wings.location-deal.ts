import type { LocationDeal } from "../location-deal.page-type.ts"

export const pizzaDominos241OrderOfWings = {
  id: "019f322c-a465-765a-9546-f222bd2aecdd",
  pageTypeSlug: "location-deal",
  slug: "pizza-dominos-2-4-1-order-of-wings",
  title: "Domino's — 2-4-1! Order of Wings!",
  collection: "starving-student-card",
  dealKey: "ssc:pizza:dominos:2-4-1-order-of-wings",
  finePrint: "Carryout Only. Saratoga & Eagle Mtn",
  locations: ["dominos-eagle-mountain", "dominos-saratoga-springs"],
  offerText: "2-4-1! Order of Wings!",
  offerType: "2-4-1",
  section: "Pizza",
  struckOut: false,
  useLimit: "1",
  usesUsed: 0,
} as const satisfies LocationDeal
