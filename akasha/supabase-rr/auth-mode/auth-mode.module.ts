import type { Module } from "../../code-system/modules/module.page-type.ts"

export const authMode = {
  id: "01a05c97-8af4-7bdc-b115-0dac324f2446",
  pageTypeSlug: "module",
  slug: "auth-mode",
  definition: "how a browser keeps a session, by cookie or by its own store",
  code: "ts",
} as const satisfies Module
