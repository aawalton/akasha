import type { TextProperty } from "../../../pages-system/text-property/text-property.page-type.ts"

export type SupabaseAuthUserId = string

export const supabaseAuthUserId = {
  id: "01a053fa-eba7-79fc-b15c-76eb7cbfe5b4",
  pageTypeSlug: "text-property",
  slug: "supabase-auth-user-id",
  propertySlug: "supabase-auth-user-id",
  definition: "the account a person signs in with",
  max: 36,
  nameFormatSlug: "name-format/lower-uuid",
  invariants: [
    {
      invariantKind: "departure",
      statement: "This names a row Supabase auth holds.",
    },
    {
      invariantKind: "departure",
      statement: "A person signing in nowhere states none of this.",
    },
    {
      invariantKind: "departure",
      statement: "Most people carry none.",
    },
  ],
} as const satisfies TextProperty
