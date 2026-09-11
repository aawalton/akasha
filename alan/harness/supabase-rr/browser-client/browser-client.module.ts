import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const browserClient = {
  id: "01a05c97-8af6-7e2b-a533-56c19f3048c1",
  pageTypeSlug: "module",
  type: "module",
  slug: "browser-client",
  definition: "the Supabase client the browser acts through, made once",
  code: "ts",
} as const satisfies Module
