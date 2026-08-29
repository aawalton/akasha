import type { Module } from "../../code-system/module/module.page-type.ts"

export const everyPageType = {
  id: "01a04b06-9811-7000-9a33-0f05dd2f0310",
  pageTypeSlug: "module",
  slug: "every-page-type",
  definition: "every page type gathered in one value, so the types can read the chain each extends",
  code: "ts",
  requiredReadingSlugs: ["page-type", "extends-slug"],
} as const satisfies Module
