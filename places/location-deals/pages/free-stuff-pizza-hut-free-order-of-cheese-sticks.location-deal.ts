import type { LocationDeal } from "../location-deal.page-type.ts"

export const freeStuffPizzaHutFreeOrderOfCheeseSticks = {
  id: "019f322c-a211-7471-84ce-f41d077775c6",
  pageTypeSlug: "location-deal",
  slug: "free-stuff-pizza-hut-free-order-of-cheese-sticks",
  title: "Pizza Hut — FREE! Order of Cheese Sticks!",
  collection: "starving-student-card",
  dealKey: "ssc:free-stuff:pizza-hut:free-order-of-cheese-sticks",
  finePrint: "Carryout Only! All Wasatch Front Locs",
  locations: ["pizza-hut-utah-county"],
  offerText: "FREE! Order of Cheese Sticks!",
  offerType: "free",
  section: "Free Stuff",
  struckOut: false,
  useLimit: "1",
  usesUsed: 0,
} as const satisfies LocationDeal
