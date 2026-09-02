import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const randomFrom = {
  id: "01a06070-82e3-77e2-98d3-05ab2563aa58",
  pageTypeSlug: "module",
  slug: "random-from",
  definition: "one item drawn at random from a list",
  code: "ts",
} as const satisfies Module
