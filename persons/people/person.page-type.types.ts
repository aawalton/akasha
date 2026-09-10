import type { Domain } from "../../domains/domain.page-type.ts"
import type { EmailAddress } from "../../personas/properties/email-address.email-address-property.ts"
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
