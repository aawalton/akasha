import type { Page } from "@akasha/pages/page"
import type { PageType } from "@akasha/pages/page-type"
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

export const smsConsent = {
  id: "019f830f-5026-7e88-9c08-a7cb23b14ef1",
  pageTypeSlug: "page-type",
  slug: "sms-consent",
  definition: "one person's agreement to be sent text messages",
  pluralSlug: "sms-consents",
  extends: ["page-type/page"],
  parts: [
    "boolean-property/sms-consent-consent",
    "instant-property/sms-consent-submitted-at",
    "phone-number-property/sms-consent-phone",
    "text-property/sms-consent-ip-address",
    "text-property/sms-consent-text-version",
    "text-property/sms-consent-user-agent",
  ],
  properties: [
    { pagePropertySlug: "text-property/title", required: true, many: false },
    { pagePropertySlug: "phone-number-property/sms-consent-phone", required: true, many: false },
    { pagePropertySlug: "boolean-property/sms-consent-consent", required: true, many: false },
    { pagePropertySlug: "text-property/sms-consent-text-version", required: true, many: false },
    { pagePropertySlug: "instant-property/sms-consent-submitted-at", required: true, many: false },
    { pagePropertySlug: "text-property/sms-consent-ip-address", required: false, many: false },
    { pagePropertySlug: "text-property/sms-consent-user-agent", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A consent names the wording the person was shown as well as the terms the person agreed to.",
    },
    {
      invariantKind: "departure",
      statement: "The agreement was to the wording.",
    },
    {
      invariantKind: "departure",
      statement: "A consent is written before the visitor is told that visitor is signed up.",
    },
    {
      invariantKind: "departure",
      statement: "A consent's slug is the digits of the number and the day the person agreed.",
    },
    {
      invariantKind: "gap",
      statement: "The consents exist as pages under this type rather than as markdown.",
    },
  ],
} as const satisfies PageType
