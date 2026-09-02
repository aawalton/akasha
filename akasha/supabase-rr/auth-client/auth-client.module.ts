import type { Module } from "../../code-system/modules/module.page-type.ts"

export const authClient = {
  id: "01a05c97-8af8-75bc-b844-9f52803ba264",
  pageTypeSlug: "module",
  slug: "auth-client",
  definition: "signing in, signing up and signing out from the browser",
  code: "ts",
} as const satisfies Module
