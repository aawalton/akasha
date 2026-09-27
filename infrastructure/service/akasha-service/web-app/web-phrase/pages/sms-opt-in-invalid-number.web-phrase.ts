import type { WebPhrase } from "akasha/infrastructure/service/akasha-service/web-app/web-phrase/web-phrase.page-type.types.ts"

export const smsOptInInvalidNumber = {
  id: "01a0e340-ba01-7ea1-b29a-c3c3bf86e0b9",
  type: "page-type/web-phrase",
  slug: "sms-opt-in-invalid-number",
  title: "Please enter a valid 10-digit US mobile number.",
} as const satisfies WebPhrase
