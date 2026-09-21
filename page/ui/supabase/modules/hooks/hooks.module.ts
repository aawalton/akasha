import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const hooks = {
  id: "01a06205-4f3b-7004-be48-0732dc16b0d9",
  type: "page-type/module",
  slug: "hooks",
  definition:
    "Reading pages from supabase: one by id suffix, all of a type, related ones, and a nav's views.",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The views a nav item holds are asked for by that nav item's address.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A nav item whose slug went unread narrows the views to none.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A related page is asked of the page type its definition names by slug before by id.",
    },
  ],
} as const satisfies Module
