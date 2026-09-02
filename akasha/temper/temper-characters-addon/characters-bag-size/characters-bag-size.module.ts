import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const charactersBagSize = {
  id: "01a062e9-b6fe-7011-83c4-ee7e2deb093c",
  pageTypeSlug: "module",
  slug: "characters-bag-size",
  definition: "the backpack size of the character now played, read into the saved table",
  code: "ts",
} as const satisfies Module
