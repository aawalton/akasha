import type { SmsConsentWording } from "akasha/person/sms-consent/wording/sms-consent-wording.page-type.types.ts"

export const amyTextMessages = {
  id: "01a0e2c8-0e41-7fb8-b799-971766d5c51c",
  type: "page-type/sms-consent-wording",
  slug: "amy-text-messages",
  title: "Text messages from Amy",
  description:
    "I agree to receive recurring SMS text messages from Amy, the personal assistant of Alan Walton, for scheduling, reminders, and coordination (not marketing). Message frequency ~100/month. Message and data rates may apply. Reply STOP to opt out, HELP for help.",
  consentTextVersion: "2026-09-11",
  createdAt: "2026-09-27T12:12:36.801Z",
  updatedAt: "2026-09-27T12:12:39.000Z",
} as const satisfies SmsConsentWording
