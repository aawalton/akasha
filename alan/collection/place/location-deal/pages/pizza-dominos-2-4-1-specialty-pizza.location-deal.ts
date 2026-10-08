import type { LocationDeal } from "akasha/alan/collection/place/location-deal/location-deal.page-type.types.ts"

export const pizzaDominos241SpecialtyPizza = {
  id: "019f322c-a46c-7f4d-9b79-856cf6b4b0d8",
  type: "page-type/location-deal",
  slug: "pizza-dominos-2-4-1-specialty-pizza",
  title: "Domino's — 2-4-1! Specialty Pizza!",
  collection: "location-collection/starving-student-card",
  dealKey: "ssc:pizza:dominos:2-4-1-specialty-pizza",
  finePrint: "Carryout Only. Saratoga & Eagle Mtn",
  locations: ["location/dominos-eagle-mountain", "location/dominos-saratoga-springs"],
  offerText: "2-4-1! Specialty Pizza!",
  offerType: "2-4-1",
  section: "Pizza",
  struckOut: false,
  useLimit: "3",
  usesUsed: 1,
  createdAt: "2026-07-05T12:06:54.316Z",
  updatedAt: "2026-09-15T17:23:10.000Z",
} as const satisfies LocationDeal
