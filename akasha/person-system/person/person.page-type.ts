import type { Domain } from "../../domain-system/domain/domain.page-type.ts"
import type { PageType } from "../../pages-system/page-type/page-type.page-type.ts"
import type { EmailAddress } from "../../persona-system/persona/properties/email-address.email-address-property.ts"
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
    "phone-number-property/phone",
    "relation-property/answered-by",
    "text-property/supabase-auth-user-id",
  ],
  properties: [
    { pagePropertySlug: "answered-by", required: true, many: false },
    { pagePropertySlug: "phone", required: false, many: false },
    { pagePropertySlug: "email-address", required: false, many: false },
    { pagePropertySlug: "supabase-auth-user-id", required: false, many: false },
  ],
} as const satisfies PageType
