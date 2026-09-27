import type { WebPhrase } from "akasha/infrastructure/service/akasha-service/web-app/web-phrase/web-phrase.page-type.types.ts"

export const smsOptInPhoneMissing = {
  id: "01a0e340-ba01-74c0-a51b-159225035bfe",
  type: "page-type/web-phrase",
  slug: "sms-opt-in-phone-missing",
  title: "Please enter your mobile phone number.",
} as const satisfies WebPhrase
