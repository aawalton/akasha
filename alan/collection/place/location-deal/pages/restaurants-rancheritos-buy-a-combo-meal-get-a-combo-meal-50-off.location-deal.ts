import type { LocationDeal } from "akasha/alan/collection/place/location-deal/location-deal.page-type.types.ts"

export const restaurantsRancheritosBuyAComboMealGetAComboMeal50Off = {
  id: "019f322c-aa9e-7b51-9006-b03f2091e69c",
  type: "page-type/location-deal",
  slug: "restaurants-rancheritos-buy-a-combo-meal-get-a-combo-meal-50-off",
  title: "Rancherito's — Buy a Combo Meal, Get a Combo Meal 50% OFF!",
  collection: "location-collection/starving-student-card",
  dealKey: "ssc:restaurants:rancheritos:buy-a-combo-meal-get-a-combo-meal-50-off",
  finePrint: "PG Only",
  locations: ["location/rancheritos-pleasant-grove"],
  offerText: "Buy a Combo Meal, Get a Combo Meal 50% OFF!",
  offerType: "percent-off",
  section: "Restaurants",
  struckOut: false,
  useLimit: "2",
  usesUsed: 0,
} as const satisfies LocationDeal
