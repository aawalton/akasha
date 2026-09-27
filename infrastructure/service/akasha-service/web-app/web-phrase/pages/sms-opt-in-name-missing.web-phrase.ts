import type { WebPhrase } from "akasha/infrastructure/service/akasha-service/web-app/web-phrase/web-phrase.page-type.types.ts"

export const smsOptInNameMissing = {
  id: "01a0e340-ba01-74de-b9aa-d89eccf739e3",
  type: "page-type/web-phrase",
  slug: "sms-opt-in-name-missing",
  title: "Please enter your full name.",
} as const satisfies WebPhrase
