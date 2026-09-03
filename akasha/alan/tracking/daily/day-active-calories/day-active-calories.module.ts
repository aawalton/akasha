import type { Module } from "../../../../code-system/modules/module.page-type.ts"

export const dayActiveCalories = {
  id: "01a06972-ba96-7000-9539-60cc6079f306",
  pageTypeSlug: "module",
  slug: "day-active-calories",
  definition:
    "one day's active calories, recomputed from the health samples and written onto the day",
  code: "ts",
} as const satisfies Module
