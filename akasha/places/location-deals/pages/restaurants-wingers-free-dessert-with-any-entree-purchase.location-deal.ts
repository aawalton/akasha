import type { LocationDeal } from "../location-deal.page-type.ts"

export const restaurantsWingersFreeDessertWithAnyEntreePurchase = {
  id: "019f322c-ab85-772e-91d2-4a7d111ca457",
  pageTypeSlug: "location-deal",
  slug: "restaurants-wingers-free-dessert-with-any-entree-purchase",
  title: "Wingers — FREE! Dessert With Any Entree Purchase!",
  collection: "starving-student-card",
  dealKey: "ssc:restaurants:wingers:free-dessert-with-any-entree-purchase",
  finePrint: "Provo",
  locations: ["wingers-provo"],
  offerText: "FREE! Dessert With Any Entree Purchase!",
  offerType: "free",
  section: "Restaurants",
  struckOut: false,
  useLimit: "3",
  usesUsed: 0,
} as const satisfies LocationDeal
