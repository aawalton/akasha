import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const database = {
  id: "01a0658b-0f02-739d-a425-d0d2ab58c103",
  type: "page-type/domain",
  slug: "database",
  definition: "the queryable store",
  parts: [
    "manifest/pgbouncer",
    "manifest/postgres-cnpg",
    "manifest/postgrest",
    "manifest/supabase-realtime",
    "manifest/supabase-studio",
    "module/retry-transient-ddl",
  ],
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A GIN index sets a small pending-list bound rather than taking the default.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every database-backed test boots its tables from the committed snapshot.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "No code the database runs is written in this repository any more.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement: "All data goes through the pages system.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement: "The postgres database is decommissioned other than for auth.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement: "Supabase is reached only for auth.",
    },
  ],
} as const satisfies Domain
