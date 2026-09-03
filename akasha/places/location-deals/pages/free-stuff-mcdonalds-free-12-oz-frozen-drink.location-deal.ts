import type { LocationDeal } from "../location-deal.page-type.ts"

export const freeStuffMcdonaldsFree12OzFrozenDrink = {
  id: "019f322c-a0e8-7ea4-ad06-1955fbc9929e",
  pageTypeSlug: "location-deal",
  slug: "free-stuff-mcdonalds-free-12-oz-frozen-drink",
  title: "McDonald's — FREE! 12 oz Frozen Drink!",
  collection: "starving-student-card",
  dealKey: "ssc:free-stuff:mcdonalds:free-12-oz-frozen-drink",
  finePrint: "All Orem, N Provo, PG, Cedar Hills & AF",
  locations: [
    "mcdonalds-american-fork",
    "mcdonalds-cedar-hills",
    "mcdonalds-orem",
    "mcdonalds-pleasant-grove",
    "mcdonalds-provo",
  ],
  offerText: "FREE! 12 oz Frozen Drink!",
  offerType: "free",
  section: "Free Stuff",
  struckOut: false,
  useLimit: "1",
  usesUsed: 0,
} as const satisfies LocationDeal
