import type { LocationDeal } from "akasha/alan/collection/place/location-deal/location-deal.page-type.types.ts"

export const treatsAndDrinksYogurtlandBuyOneYogurtGetOneFree = {
  id: "019f322c-b2dc-7c2a-a709-2bb0b2d01239",
  type: "page-type/location-deal",
  slug: "treats-and-drinks-yogurtland-buy-one-yogurt-get-one-free",
  title: "Yogurtland — Buy One Yogurt, Get One FREE!",
  collection: "location-collection/starving-student-card",
  dealKey: "ssc:treats-and-drinks:yogurtland:buy-one-yogurt-get-one-free",
  locations: ["location/yogurtland-utah-county"],
  offerText: "Buy One Yogurt, Get One FREE!",
  offerType: "free",
  section: "Treats & Drinks",
  struckOut: false,
  useLimit: "3",
  usesUsed: 0,
  createdAt: "2026-07-05T12:06:58.012Z",
  updatedAt: "2026-09-15T17:23:55.000Z",
} as const satisfies LocationDeal
