import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const nutritionPoints = {
  id: "01a06972-bb85-7000-8554-6b5e4a91a4b9",
  type: "page-type/module",
  slug: "nutrition-points",
  definition: "how code writes the grams of whole plants Alan eats on a day to that day's page",
  code: "ts",
  reachedByPath: ["rollupNutritionForDay"],
  createdAt: "2026-09-03T22:45:21.925Z",
  updatedAt: "2026-10-30T16:48:12.476Z",
} as const satisfies Module
