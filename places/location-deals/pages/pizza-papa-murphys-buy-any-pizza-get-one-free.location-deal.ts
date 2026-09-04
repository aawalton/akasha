import type { LocationDeal } from "../location-deal.page-type.ts"

export const pizzaPapaMurphysBuyAnyPizzaGetOneFree = {
  id: "019f322c-a52f-7dd9-90c0-bda887052071",
  pageTypeSlug: "location-deal",
  slug: "pizza-papa-murphys-buy-any-pizza-get-one-free",
  title: "Papa Murphy's — Buy Any Pizza, Get One FREE!",
  collection: "starving-student-card",
  dealKey: "ssc:pizza:papa-murphys:buy-any-pizza-get-one-free",
  finePrint: "Provo & Park City",
  locations: ["papa-murphys-park-city", "papa-murphys-provo"],
  offerText: "Buy Any Pizza, Get One FREE!",
  offerType: "2-4-1",
  section: "Pizza",
  struckOut: false,
  useLimit: "2",
  usesUsed: 0,
} as const satisfies LocationDeal
