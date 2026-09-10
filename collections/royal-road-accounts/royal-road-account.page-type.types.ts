import type { Page } from "../../pages/page.page-type.ts"
import type { RoyalRoadEmail } from "./properties/royal-road-email.email-address-property.ts"
import type { RoyalRoadPassword } from "./properties/royal-road-password.text-property.ts"

export type RoyalRoadAccount = Page & {
  email: RoyalRoadEmail
  password?: RoyalRoadPassword
}
