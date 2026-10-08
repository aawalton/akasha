import type { LocationDeal } from "akasha/alan/collection/place/location-deal/location-deal.page-type.types.ts"

export const pizzaDominos241Pizza = {
  id: "019f322c-a469-74a1-8975-ae093f369f35",
  type: "page-type/location-deal",
  slug: "pizza-dominos-2-4-1-pizza",
  title: "Domino's — 2-4-1! Pizza!",
  collection: "location-collection/starving-student-card",
  dealKey: "ssc:pizza:dominos:2-4-1-pizza",
  finePrint: "Carryout Only. Saratoga & Eagle Mtn",
  locations: ["location/dominos-eagle-mountain", "location/dominos-saratoga-springs"],
  offerText: "2-4-1! Pizza!",
  offerType: "2-4-1",
  section: "Pizza",
  struckOut: false,
  useLimit: "3",
  usesUsed: 0,
  createdAt: "2026-07-05T12:06:54.313Z",
  updatedAt: "2026-09-15T17:23:10.000Z",
} as const satisfies LocationDeal
