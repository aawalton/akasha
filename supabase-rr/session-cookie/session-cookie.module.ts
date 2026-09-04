import type { Module } from "../../code-system/modules/module.page-type.ts"

export const sessionCookie = {
  id: "01a05c97-8af5-7c64-bf49-f3875345a184",
  pageTypeSlug: "module",
  slug: "session-cookie",
  definition: "whether a cookie header carries a Supabase session",
  code: "ts",
} as const satisfies Module
