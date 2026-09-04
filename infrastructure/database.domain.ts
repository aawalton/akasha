import type { Domain } from "../domains/domains/domain.page-type.ts"

export const database = {
  id: "01a0658b-0f02-739d-a425-d0d2ab58c103",
  pageTypeSlug: "domain",
  slug: "database",
  definition: "the queryable store",
  pluralSlug: "databases",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A GIN index sets a small pending-list bound rather than taking the default.",
    },
    {
      invariantKind: "departure",
      statement: "Every database-backed test boots its tables from the committed snapshot.",
    },
    {
      invariantKind: "absence",
      statement: "No code the database runs is written in this repository any more.",
    },
    {
      invariantKind: "gap",
      statement: "All data goes through the pages system.",
    },
    {
      invariantKind: "gap",
      statement: "The postgres database is decommissioned other than for auth.",
    },
    {
      invariantKind: "gap",
      statement: "Supabase is reached only for auth.",
    },
  ],
} as const satisfies Domain
