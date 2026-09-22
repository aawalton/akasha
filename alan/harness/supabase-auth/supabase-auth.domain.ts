import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const supabaseAuth = {
  id: "01a05c6d-3507-7082-9e71-8c024f532b00",
  type: "page-type/domain",
  slug: "supabase-auth",
  definition: "this workstation's account",

  parts: ["module/user-id"],
  decisions: [
    {
      decisionKind: "decision-kind/absence",
      statement: "No key is here.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No token is here.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No password is here.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here signs anybody in.",
    },
  ],
} as const satisfies Domain
