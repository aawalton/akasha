import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const supabaseAuthUserId = {
  id: "01a053fa-eba7-79fc-b15c-76eb7cbfe5b4",
  type: "page-type/text-property",
  slug: "supabase-auth-user-id",
  propertySlug: "supabase-auth-user-id",
  definition: "a person's sign-in account",
  maxLength: 36,
  nameFormat: "name-format/lower-uuid",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The account names a row Supabase auth has.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A person signing in nowhere states no account.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Most people have no account.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
