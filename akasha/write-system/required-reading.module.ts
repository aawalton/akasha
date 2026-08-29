import type { Module } from "../code-system/module/module.page-type.ts"

export const requiredReading = {
  id: "01a04a32-495b-7065-94dd-182ba0270aa8",
  pageTypeSlug: "module",
  slug: "required-reading",
  definition: "what must be read before an act on a page is allowed",
  code: "ts",
  test: "ts",
  requiredReadingSlugs: ["corpus"],
} as const satisfies Module
