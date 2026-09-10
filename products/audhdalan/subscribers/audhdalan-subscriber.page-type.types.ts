import type { Page } from "../../../pages/page.page-type.types.ts"
import type { SubscriberEmail } from "./properties/subscriber-email.email-address-property.ts"

export type AudhdalanSubscriber = Page & {
  email: SubscriberEmail
}
