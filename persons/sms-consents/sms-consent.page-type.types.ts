import type { Page } from "../../pages/page.page-type.types.ts"
import type { Title } from "../../pages/properties/title.text-property.ts"
import type { SmsConsentConsent } from "./properties/sms-consent-consent.boolean-property.ts"
import type { SmsConsentIpAddress } from "./properties/sms-consent-ip-address.text-property.ts"
import type { SmsConsentPhone } from "./properties/sms-consent-phone.phone-number-property.ts"
import type { SmsConsentSubmittedAt } from "./properties/sms-consent-submitted-at.instant-property.ts"
import type { SmsConsentTextVersion } from "./properties/sms-consent-text-version.text-property.ts"
import type { SmsConsentUserAgent } from "./properties/sms-consent-user-agent.text-property.ts"

export type SmsConsent = Page & {
  title: Title
  phone: SmsConsentPhone
  consent: SmsConsentConsent
  consentTextVersion: SmsConsentTextVersion
  submittedAt: SmsConsentSubmittedAt
  ipAddress?: SmsConsentIpAddress
  userAgent?: SmsConsentUserAgent
}
