import type { PageType } from "akasha/pages/types/page-type.page-type.types.ts"

export const smsConsent = {
  id: "019f830f-5026-7e88-9c08-a7cb23b14ef1",
  pageTypeSlug: "page-type",
  type: "page-type",
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
    { pageProperty: "text-property/title", required: true, many: false },
    { pageProperty: "phone-number-property/sms-consent-phone", required: true, many: false },
    { pageProperty: "boolean-property/sms-consent-consent", required: true, many: false },
    { pageProperty: "text-property/sms-consent-text-version", required: true, many: false },
    { pageProperty: "instant-property/sms-consent-submitted-at", required: true, many: false },
    { pageProperty: "text-property/sms-consent-ip-address", required: false, many: false },
    { pageProperty: "text-property/sms-consent-user-agent", required: false, many: false },
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
  types: "ts",
} as const satisfies PageType
