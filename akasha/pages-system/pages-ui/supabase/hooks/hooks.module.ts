import type { Module } from "@akasha/code-system/module"

export const hooks = {
  id: "01a06205-4f3b-7004-be48-0732dc16b0d9",
  pageTypeSlug: "module",
  slug: "hooks",
  definition:
    "Reading pages from supabase: one by id suffix, all of a type, related ones, and a nav's views.",
  code: "ts",
} as const satisfies Module
