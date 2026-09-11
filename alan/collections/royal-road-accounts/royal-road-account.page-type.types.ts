import type { RoyalRoadEmail } from "akasha/alan/collections/royal-road-accounts/properties/royal-road-email.email-address-property.types.ts"
import type { RoyalRoadPassword } from "akasha/alan/collections/royal-road-accounts/properties/royal-road-password.text-property.types.ts"
import type { Page } from "akasha/pages/page.page-type.types.ts"

export type RoyalRoadAccount = Page & {
  email: RoyalRoadEmail
  password?: RoyalRoadPassword
}
