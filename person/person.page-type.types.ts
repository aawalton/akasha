import type { Domain } from "akasha/domain/domain.page-type.types.ts"
import type { AnsweredBy } from "akasha/person/properties/answered-by.relation-property.types.ts"
import type { Bodyweight } from "akasha/person/properties/bodyweight.number-property.types.ts"
import type { PersonContributor } from "akasha/person/properties/person-contributor.relation-property.types.ts"
import type { Phone } from "akasha/person/properties/phone.phone-number-property.types.ts"
import type { SupabaseAuthUserId } from "akasha/person/properties/supabase-auth-user-id.text-property.types.ts"
import type { EmailAddress } from "akasha/persona/properties/email-address.email-address-property.types.ts"

export type Person = Domain & {
  answeredBy: AnsweredBy
  phone?: Phone
  email?: EmailAddress
  supabaseAuthUserId?: SupabaseAuthUserId
  bodyweight?: Bodyweight
  contributor?: PersonContributor
}
