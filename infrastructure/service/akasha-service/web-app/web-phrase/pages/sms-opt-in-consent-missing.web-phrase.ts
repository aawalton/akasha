import type { WebPhrase } from "akasha/infrastructure/service/akasha-service/web-app/web-phrase/web-phrase.page-type.types.ts"

export const smsOptInConsentMissing = {
  id: "01a0e340-ba01-7727-9b2f-41a45a1955ed",
  type: "page-type/web-phrase",
  slug: "sms-opt-in-consent-missing",
  title: "Please check the box to agree to receive messages.",
} as const satisfies WebPhrase
