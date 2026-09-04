import type { Module } from "../../code-system/modules/module.page-type.ts"

export const effectiveAuth = {
  id: "01a05c97-8af6-7cce-842f-2ea2d09df8f5",
  pageTypeSlug: "module",
  slug: "effective-auth",
  definition: "whether a request counts as signed in",
  code: "ts",
} as const satisfies Module
