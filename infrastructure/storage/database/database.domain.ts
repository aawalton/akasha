import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const database = {
  id: "01a0658b-0f02-739d-a425-d0d2ab58c103",
  type: "page-type/domain",
  slug: "database",
  definition: "the queryable store",
  parts: ["manifest/postgres-cnpg", "module/retry-transient-ddl"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A GIN index sets a small pending-list bound rather than taking the default.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every database-backed test boots its tables from the committed snapshot.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No code the database runs is written in this repository any more.",
    },
    {
      decisionKind: "decision-kind/gap",
      statement: "All data goes through the pages system.",
    },
    {
      decisionKind: "decision-kind/gap",
      statement: "The postgres database is decommissioned other than for auth.",
    },
    {
      decisionKind: "decision-kind/gap",
      statement: "Supabase is reached only for auth.",
    },
  ],
} as const satisfies Domain
