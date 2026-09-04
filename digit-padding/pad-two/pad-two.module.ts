import type { Module } from "../../code-system/modules/module.page-type.ts"

export const padTwo = {
  id: "01a05c8b-6039-7947-8056-77c452128ce1",
  pageTypeSlug: "module",
  slug: "pad-two",
  definition: "a number written to two characters, filled out with a leading zero",
  code: "ts",
} as const satisfies Module
