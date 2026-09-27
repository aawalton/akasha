import type { WebPhrase } from "akasha/infrastructure/service/akasha-service/web-app/web-phrase/web-phrase.page-type.types.ts"

export const smsOptInSubmit = {
  id: "01a0e340-ba01-77f1-a2b1-ec5b027b6331",
  type: "page-type/web-phrase",
  slug: "sms-opt-in-submit",
  title: "Opt in to messages",
} as const satisfies WebPhrase
