import type { LocationDeal } from "akasha/alan/collection/place/location-deal/location-deal.page-type.types.ts"

export const treatsAndDrinksRollUpCrepes50OffAnyPurchaseUpTo4 = {
  id: "019f322c-b150-70d5-8823-ea5cc2f2d2df",
  type: "location-deal",
  slug: "treats-and-drinks-roll-up-crepes-50-off-any-purchase-up-to-4",
  title: "Roll Up Crepes — 50% OFF! Any Purchase! Up to $4!",
  collection: "location-collection/starving-student-card",
  dealKey: "ssc:treats-and-drinks:roll-up-crepes:50-off-any-purchase-up-to-4",
  finePrint: "Orem & SF",
  locations: ["location/roll-up-crepes-orem", "location/roll-up-crepes-spanish-fork"],
  offerText: "50% OFF! Any Purchase! Up to $4!",
  offerType: "percent-off",
  section: "Treats & Drinks",
  struckOut: false,
  useLimit: "1",
  usesUsed: 0,
} as const satisfies LocationDeal
