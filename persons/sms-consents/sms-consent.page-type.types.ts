import type { Page } from "akasha/pages/page.page-type.types.ts"
import type { Title } from "akasha/pages/properties/title.text-property.ts"
import type { SmsConsentConsent } from "akasha/persons/sms-consents/properties/sms-consent-consent.boolean-property.types.ts"
import type { SmsConsentIpAddress } from "akasha/persons/sms-consents/properties/sms-consent-ip-address.text-property.ts"
import type { SmsConsentPhone } from "akasha/persons/sms-consents/properties/sms-consent-phone.phone-number-property.types.ts"
import type { SmsConsentSubmittedAt } from "akasha/persons/sms-consents/properties/sms-consent-submitted-at.instant-property.types.ts"
import type { SmsConsentTextVersion } from "akasha/persons/sms-consents/properties/sms-consent-text-version.text-property.ts"
import type { SmsConsentUserAgent } from "akasha/persons/sms-consents/properties/sms-consent-user-agent.text-property.ts"

export type SmsConsent = Page & {
  title: Title
  phone: SmsConsentPhone
  consent: SmsConsentConsent
  consentTextVersion: SmsConsentTextVersion
  submittedAt: SmsConsentSubmittedAt
  ipAddress?: SmsConsentIpAddress
  userAgent?: SmsConsentUserAgent
}
