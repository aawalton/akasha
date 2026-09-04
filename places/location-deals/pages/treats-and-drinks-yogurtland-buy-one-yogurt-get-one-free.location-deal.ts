import type { LocationDeal } from "../location-deal.page-type.ts"

export const treatsAndDrinksYogurtlandBuyOneYogurtGetOneFree = {
  id: "019f322c-b2dc-7c2a-a709-2bb0b2d01239",
  pageTypeSlug: "location-deal",
  slug: "treats-and-drinks-yogurtland-buy-one-yogurt-get-one-free",
  title: "Yogurtland — Buy One Yogurt, Get One FREE!",
  collection: "starving-student-card",
  dealKey: "ssc:treats-and-drinks:yogurtland:buy-one-yogurt-get-one-free",
  locations: ["yogurtland-utah-county"],
  offerText: "Buy One Yogurt, Get One FREE!",
  offerType: "free",
  section: "Treats & Drinks",
  struckOut: false,
  useLimit: "3",
  usesUsed: 0,
} as const satisfies LocationDeal
