import type { Domain } from "@akasha/domain-system/domain"
import type { PageType } from "@akasha/pages-system/page-type"
import type { EmailAddress } from "@akasha/persona-system/email-address"
import type { AnsweredBy } from "./properties/answered-by.relation-property.ts"
import type { Phone } from "./properties/phone.phone-number-property.ts"
import type { SupabaseAuthUserId } from "./properties/supabase-auth-user-id.text-property.ts"

export type Person = Domain & {
  answeredBy: AnsweredBy
  phone?: Phone
  emailAddress?: EmailAddress
  supabaseAuthUserId?: SupabaseAuthUserId
}

export const person = {
  id: "01a053e0-6cf7-7062-90af-db1def200572",
  pageTypeSlug: "page-type",
  slug: "person",
  definition: "a human this system reaches",
  pluralSlug: "people",
  extendsSlug: "page-type/domain",
  partSlugs: [
    "person/alan",
    "person/david",
    "person/jenny",
    "person/joseph",
    "person/katara",
    "person/ki",
    "person/lizzy",
    "phone-number-property/phone",
    "relation-property/answered-by",
    "text-property/supabase-auth-user-id",
    "domain/email",
  ],
  properties: [
    { pagePropertySlug: "answered-by", required: true, many: false },
    { pagePropertySlug: "phone", required: false, many: false },
    { pagePropertySlug: "email-address", required: false, many: false },
    { pagePropertySlug: "supabase-auth-user-id", required: false, many: false },
  ],
} as const satisfies PageType
