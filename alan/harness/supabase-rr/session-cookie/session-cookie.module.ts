import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const sessionCookie = {
  id: "01a05c97-8af5-7c64-bf49-f3875345a184",
  pageTypeSlug: "module",
  type: "module",
  slug: "session-cookie",
  definition: "whether a cookie header has a Supabase session",
  code: "ts",
} as const satisfies Module
