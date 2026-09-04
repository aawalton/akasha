import type { LocationDeal } from "../location-deal.page-type.ts"

export const pizzaDominos241Pizza = {
  id: "019f322c-a469-74a1-8975-ae093f369f35",
  pageTypeSlug: "location-deal",
  slug: "pizza-dominos-2-4-1-pizza",
  title: "Domino's — 2-4-1! Pizza!",
  collection: "starving-student-card",
  dealKey: "ssc:pizza:dominos:2-4-1-pizza",
  finePrint: "Carryout Only. Saratoga & Eagle Mtn",
  locations: ["dominos-eagle-mountain", "dominos-saratoga-springs"],
  offerText: "2-4-1! Pizza!",
  offerType: "2-4-1",
  section: "Pizza",
  struckOut: false,
  useLimit: "3",
  usesUsed: 0,
} as const satisfies LocationDeal
