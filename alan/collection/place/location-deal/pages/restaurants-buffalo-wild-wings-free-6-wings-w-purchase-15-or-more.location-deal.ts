import type { LocationDeal } from "akasha/alan/collection/place/location-deal/location-deal.page-type.types.ts"

export const restaurantsBuffaloWildWingsFree6WingsWPurchase15OrMore = {
  id: "019f322c-a6b6-7efb-ba59-d23cfe27feb3",
  type: "page-type/location-deal",
  slug: "restaurants-buffalo-wild-wings-free-6-wings-w-purchase-15-or-more",
  title: "Buffalo Wild Wings — FREE! 6 Wings w/ Purchase $15 or More!",
  collection: "location-collection/starving-student-card",
  dealKey: "ssc:restaurants:buffalo-wild-wings:free-6-wings-w-purchase-15-or-more",
  finePrint: "Excl. Alcohol Orem & Lehi",
  locations: ["location/buffalo-wild-wings-lehi", "location/buffalo-wild-wings-orem"],
  offerText: "FREE! 6 Wings w/ Purchase $15 or More!",
  offerType: "free",
  section: "Restaurants",
  struckOut: false,
  useLimit: "3",
  usesUsed: 0,
} as const satisfies LocationDeal
