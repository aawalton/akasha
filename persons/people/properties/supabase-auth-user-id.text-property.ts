import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export type SupabaseAuthUserId = string

export const supabaseAuthUserId = {
  id: "01a053fa-eba7-79fc-b15c-76eb7cbfe5b4",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "supabase-auth-user-id",
  propertySlug: "supabase-auth-user-id",
  definition: "the account a person signs in with",
  maxLength: 36,
  nameFormat: "name-format/lower-uuid",
  invariants: [
    {
      invariantKind: "departure",
      statement: "This names a row Supabase auth has.",
    },
    {
      invariantKind: "departure",
      statement: "A person signing in nowhere states no account.",
    },
    {
      invariantKind: "departure",
      statement: "Most people have no account.",
    },
  ],
} as const satisfies TextProperty
