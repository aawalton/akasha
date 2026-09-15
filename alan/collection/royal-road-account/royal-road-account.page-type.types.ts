import type { RoyalRoadEmail } from "akasha/alan/collection/royal-road-account/properties/royal-road-email.email-address-property.types.ts"
import type { RoyalRoadPassword } from "akasha/alan/collection/royal-road-account/properties/royal-road-password.text-property.types.ts"
import type { Page } from "akasha/page/page.page-type.types.ts"

export type RoyalRoadAccount = Page & {
  email: RoyalRoadEmail
  password?: RoyalRoadPassword
}
