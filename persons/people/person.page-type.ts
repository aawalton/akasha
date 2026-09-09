import type { Domain } from "@akasha/domains/domain"
import type { PageType } from "@akasha/pages/page-type"
import type { EmailAddress } from "@akasha/personas/email-address"
import type { AnsweredBy } from "./properties/answered-by.relation-property.ts"
import type { Bodyweight } from "./properties/bodyweight.number-property.ts"
import type { Phone } from "./properties/phone.phone-number-property.ts"
import type { SupabaseAuthUserId } from "./properties/supabase-auth-user-id.text-property.ts"

export type Person = Domain & {
  answeredBy: AnsweredBy
  phone?: Phone
  email?: EmailAddress
  supabaseAuthUserId?: SupabaseAuthUserId
  bodyweight?: Bodyweight
}

export const person = {
  id: "01a053e0-6cf7-7062-90af-db1def200572",
  pageTypeSlug: "page-type",
  slug: "person",
  definition: "a human this system reaches",
  pluralSlug: "people",
  extends: ["page-type/domain"],
  parts: [
    "number-property/bodyweight",
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
    { pageProperty: "relation-property/answered-by", required: true, many: false },
    { pageProperty: "phone-number-property/phone", required: false, many: false },
    { pageProperty: "email-address-property/email-address", required: false, many: false },
    { pageProperty: "text-property/supabase-auth-user-id", required: false, many: false },
    { pageProperty: "number-property/bodyweight", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A person whose body nothing here counts against states no weight.",
    },
  ],
} as const satisfies PageType
