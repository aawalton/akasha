import type { LocationDeal } from "../location-deal.page-type.ts"

export const pizzaDominos241SpecialtyPizza = {
  id: "019f322c-a46c-7f4d-9b79-856cf6b4b0d8",
  pageTypeSlug: "location-deal",
  slug: "pizza-dominos-2-4-1-specialty-pizza",
  title: "Domino's — 2-4-1! Specialty Pizza!",
  collection: "starving-student-card",
  dealKey: "ssc:pizza:dominos:2-4-1-specialty-pizza",
  finePrint: "Carryout Only. Saratoga & Eagle Mtn",
  locations: ["dominos-eagle-mountain", "dominos-saratoga-springs"],
  offerText: "2-4-1! Specialty Pizza!",
  offerType: "2-4-1",
  section: "Pizza",
  struckOut: false,
  useLimit: "3",
  usesUsed: 1,
} as const satisfies LocationDeal
