import type { LocationDeal } from "akasha/alan/collection/place/location-deal/location-deal.page-type.types.ts"

export const treatsAndDrinksJackInTheBoxBuy1ShakeGet1Free = {
  id: "019f322c-b109-75d0-a7f1-baad22965fde",
  type: "page-type/location-deal",
  slug: "treats-and-drinks-jack-in-the-box-buy-1-shake-get-1-free",
  title: "Jack in the Box — Buy 1 Shake, Get 1 FREE!",
  collection: "location-collection/starving-student-card",
  dealKey: "ssc:treats-and-drinks:jack-in-the-box:buy-1-shake-get-1-free",
  finePrint: "All Utah County",
  locations: ["location/jack-in-the-box-utah-county"],
  offerText: "Buy 1 Shake, Get 1 FREE!",
  offerType: "free",
  section: "Treats & Drinks",
  struckOut: false,
  useLimit: "3",
  usesUsed: 0,
  createdAt: "2026-07-05T12:06:57.545Z",
  updatedAt: "2026-09-15T17:23:34.000Z",
} as const satisfies LocationDeal
