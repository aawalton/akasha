import type { Module } from "../../code-system/module/module.page-type.ts"

export const everyPageType = {
  id: "01a04b06-9811-7000-9a33-0f05dd2f0310",
  pageTypeSlug: "module",
  slug: "every-page-type",
  definition: "every page type gathered in one value, so the types can read the chain each extends",
  code: "ts",
  test: "ts",
  requiredReadingSlugs: ["page-type/page-type", "page-property-type/extends-slug"],
  design: [
    "The chain each page type extends is declared here beside the pages that state it.",
    "A relation admitting more than one page type takes a value naming the page type and the slug.",
    "A page type missing from this value widens what its relations admit.",
  ],
} as const satisfies Module
