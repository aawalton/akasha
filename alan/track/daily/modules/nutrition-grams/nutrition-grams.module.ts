import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const nutritionGrams = {
  id: "01a06972-bb06-7000-91da-b9dd90114feb",
  type: "page-type/module",
  slug: "nutrition-grams",
  definition: "the grams of plant Alan ate across a day, from its opening to the next",
  code: "ts",
} as const satisfies Module
