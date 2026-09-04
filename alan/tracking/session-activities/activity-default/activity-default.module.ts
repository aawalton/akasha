import type { Module } from "@akasha/code-system/module"

export const activityDefault = {
  id: "01a069c6-3827-7932-9e1d-8fa453a5dc5b",
  pageTypeSlug: "module",
  slug: "activity-default",
  definition: "the difficulty a session rates at when its title names an activity",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "An activity is matched by the stem its title makes.",
    },
    {
      invariantKind: "departure",
      statement: "An activity already written keeps the identity it carries.",
    },
    {
      invariantKind: "departure",
      statement: "The page is composed by the pages system rather than written here.",
    },
    {
      invariantKind: "departure",
      statement: "The composed page is handed to akasha's own verb to land.",
    },
  ],
} as const satisfies Module
