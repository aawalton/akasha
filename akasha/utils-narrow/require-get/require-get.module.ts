import type { Module } from "../../code-system/modules/module.page-type.ts"

export const requireGet = {
  id: "01a05c94-2c01-7d4f-983a-9b980754af38",
  pageTypeSlug: "module",
  slug: "require-get",
  definition: "the value a map holds under a key, refused where it holds none",
  code: "ts",
} as const satisfies Module
