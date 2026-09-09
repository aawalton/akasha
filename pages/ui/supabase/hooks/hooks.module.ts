import type { Module } from "@akasha/code/module"

export const hooks = {
  id: "01a06205-4f3b-7004-be48-0732dc16b0d9",
  pageTypeSlug: "module",
  type: "module",
  slug: "hooks",
  definition:
    "Reading pages from supabase: one by id suffix, all of a type, related ones, and a nav's views.",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The views a nav item holds are asked for by that nav item's slug.",
    },
    {
      invariantKind: "departure",
      statement: "A nav item whose slug went unread narrows the views to none.",
    },
  ],
} as const satisfies Module
