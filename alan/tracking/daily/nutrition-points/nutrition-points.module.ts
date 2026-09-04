import type { Module } from "../../../../code-system/modules/module.page-type.ts"

export const nutritionPoints = {
  id: "01a06972-bb85-7000-8554-6b5e4a91a4b9",
  pageTypeSlug: "module",
  slug: "nutrition-points",
  definition: "one day's nutrition points, worked out from its plant grams and landed on the day",
  code: "ts",
} as const satisfies Module
