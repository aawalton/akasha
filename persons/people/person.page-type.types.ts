import type { Domain } from "../../domains/domain.page-type.types.ts"
import type { EmailAddress } from "../../personas/properties/email-address.email-address-property.types.ts"
import type { AnsweredBy } from "./properties/answered-by.relation-property.ts"
import type { Bodyweight } from "./properties/bodyweight.number-property.types.ts"
import type { Phone } from "./properties/phone.phone-number-property.types.ts"
import type { SupabaseAuthUserId } from "./properties/supabase-auth-user-id.text-property.ts"

export type Person = Domain & {
  answeredBy: AnsweredBy
  phone?: Phone
  email?: EmailAddress
  supabaseAuthUserId?: SupabaseAuthUserId
  bodyweight?: Bodyweight
}
