import type { Module } from "../../../../code-system/modules/module.page-type.ts"

export const nutritionGrams = {
  id: "01a06972-bb06-7000-91da-b9dd90114feb",
  pageTypeSlug: "module",
  type: "module",
  slug: "nutrition-grams",
  definition: "the grams of plant Alan ate across one day, from its opening to the next",
  code: "ts",
} as const satisfies Module
