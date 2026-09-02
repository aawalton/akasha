import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const arithmeticNode = {
  id: "01a06070-82db-7c2d-a42f-2faa0f022ff6",
  pageTypeSlug: "module",
  slug: "arithmetic-node",
  definition: "a stat formula held as a tree of add, multiply, divide, floor, max and min steps",
  code: "ts",
} as const satisfies Module
