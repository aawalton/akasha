import type { WebPhrase } from "akasha/infrastructure/service/akasha-service/web-app/web-phrase/web-phrase.page-type.types.ts"

export const smsOptInInvalidRequest = {
  id: "01a0e340-ba01-71dd-accb-9bd5dc501b8e",
  type: "page-type/web-phrase",
  slug: "sms-opt-in-invalid-request",
  title: "Invalid request.",
} as const satisfies WebPhrase
