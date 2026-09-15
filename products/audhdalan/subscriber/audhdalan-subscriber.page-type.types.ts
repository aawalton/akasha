import type { Page } from "akasha/page/page.page-type.types.ts"
import type { SubscriberEmail } from "akasha/products/audhdalan/subscriber/properties/subscriber-email.email-address-property.types.ts"

export type AudhdalanSubscriber = Page & {
  email: SubscriberEmail
}
