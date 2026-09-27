import type { WebPhrase } from "akasha/infrastructure/service/akasha-service/web-app/web-phrase/web-phrase.page-type.types.ts"

export const smsOptInWordingChanged = {
  id: "01a0e340-ba01-712f-8500-b013f7006fcf",
  type: "page-type/web-phrase",
  slug: "sms-opt-in-wording-changed",
  title: "The wording has changed since this page opened. Please read it again.",
} as const satisfies WebPhrase
