import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const nutritionPoints = {
  id: "01a06972-bb85-7000-8554-6b5e4a91a4b9",
  type: "page-type/module",
  slug: "nutrition-points",
  definition: "a day's nutrition points, worked out from its plant grams and landed on the day",
  code: "ts",
  reachedByPath: ["rollupNutritionForDay"],
  createdAt: "2026-09-03T22:45:21.925Z",
  updatedAt: "2026-09-22T10:05:47.000Z",
} as const satisfies Module
