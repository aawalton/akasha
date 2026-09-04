import type { Module } from "../../code-system/modules/module.page-type.ts"

export const serverClient = {
  id: "01a05c97-8af6-7f9b-8357-b19e8b1a5751",
  pageTypeSlug: "module",
  slug: "server-client",
  definition: "the Supabase client a request is served through, carrying its cookies",
  code: "ts",
} as const satisfies Module
