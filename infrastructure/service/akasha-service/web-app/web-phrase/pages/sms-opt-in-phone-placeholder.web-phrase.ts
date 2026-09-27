import type { WebPhrase } from "akasha/infrastructure/service/akasha-service/web-app/web-phrase/web-phrase.page-type.types.ts"

export const smsOptInPhonePlaceholder = {
  id: "01a0e340-ba01-77f6-a53d-73a9b5f86101",
  type: "page-type/web-phrase",
  slug: "sms-opt-in-phone-placeholder",
  title: "(555) 123-4567",
} as const satisfies WebPhrase
