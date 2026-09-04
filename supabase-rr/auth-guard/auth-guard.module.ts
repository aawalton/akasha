import type { Module } from "../../code-system/modules/module.page-type.ts"

export const authGuard = {
  id: "01a05c97-8af8-7068-817c-90f46f8ccb6f",
  pageTypeSlug: "module",
  slug: "auth-guard",
  definition: "where a request is let through and where it is sent to sign in",
  code: "ts",
} as const satisfies Module
