import type { Page } from "akasha/pages/page.page-type.types.ts"
import type { SubscriberEmail } from "akasha/products/audhdalan/subscribers/properties/subscriber-email.email-address-property.types.ts"

export type AudhdalanSubscriber = Page & {
  email: SubscriberEmail
}
