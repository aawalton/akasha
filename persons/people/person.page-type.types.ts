import type { Domain } from "akasha/domains/domain.page-type.types.ts"
import type { EmailAddress } from "akasha/personas/properties/email-address.email-address-property.types.ts"
import type { AnsweredBy } from "akasha/persons/people/properties/answered-by.relation-property.types.ts"
import type { Bodyweight } from "akasha/persons/people/properties/bodyweight.number-property.types.ts"
import type { Phone } from "akasha/persons/people/properties/phone.phone-number-property.types.ts"
import type { SupabaseAuthUserId } from "akasha/persons/people/properties/supabase-auth-user-id.text-property.ts"

export type Person = Domain & {
  answeredBy: AnsweredBy
  phone?: Phone
  email?: EmailAddress
  supabaseAuthUserId?: SupabaseAuthUserId
  bodyweight?: Bodyweight
}
