import type { Page } from "akasha/page/page.page-type.types.ts"
import type { Title } from "akasha/page/properties/title.text-property.types.ts"
import type { SmsConsentConsent } from "akasha/person/sms-consent/properties/sms-consent-consent.boolean-property.types.ts"
import type { SmsConsentIpAddress } from "akasha/person/sms-consent/properties/sms-consent-ip-address.text-property.types.ts"
import type { SmsConsentPhone } from "akasha/person/sms-consent/properties/sms-consent-phone.phone-number-property.types.ts"
import type { SmsConsentSubmittedAt } from "akasha/person/sms-consent/properties/sms-consent-submitted-at.instant-property.types.ts"
import type { SmsConsentTextVersion } from "akasha/person/sms-consent/properties/sms-consent-text-version.text-property.types.ts"
import type { SmsConsentUserAgent } from "akasha/person/sms-consent/properties/sms-consent-user-agent.text-property.types.ts"

export type SmsConsent = Page & {
  title: Title
  phone: SmsConsentPhone
  consent: SmsConsentConsent
  consentTextVersion: SmsConsentTextVersion
  submittedAt: SmsConsentSubmittedAt
  ipAddress?: SmsConsentIpAddress
  userAgent?: SmsConsentUserAgent
}
