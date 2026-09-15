import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const supabaseAuth = {
  id: "01a05c6d-3507-7082-9e71-8c024f532b00",
  type: "page-type/domain",
  slug: "supabase-auth",
  definition: "signing in to Supabase, and who the signed-in user is",

  parts: [
    "module/auth",
    "module/claims",
    "module/protected-user",
    "module/supabase-user",
    "module/user-id",
  ],
  invariants: [
    {
      invariantKind: "invariant-kind/absence",
      statement: "No key is here.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "No token is here.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "No password is here.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every call takes the Supabase client its caller made.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The claims module is reached only from the modules beside the claims module.",
    },
  ],
} as const satisfies Domain
