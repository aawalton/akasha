import type { WebPhrase } from "akasha/infrastructure/service/akasha-service/web-app/web-phrase/web-phrase.page-type.types.ts"

export const smsOptInThanks = {
  id: "01a0e340-ba01-785c-b0e5-c85975772393",
  type: "page-type/web-phrase",
  slug: "sms-opt-in-thanks",
  title: "Thank you — your consent is recorded.",
} as const satisfies WebPhrase
