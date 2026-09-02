import type { Module } from "../../code-system/modules/module.page-type.ts"

export const requireAt = {
  id: "01a05c94-2c00-790b-be50-603859fc638c",
  pageTypeSlug: "module",
  slug: "require-at",
  definition: "the element at an index, refused where the array is shorter",
  code: "ts",
} as const satisfies Module
