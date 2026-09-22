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
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A related page is read from the store's collection rather than asked of the service.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The page types the relations reach are acquired into the store before they are read.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The views a page type holds are asked for by that page type's address.",
    },
  ],
} as const satisfies Module
