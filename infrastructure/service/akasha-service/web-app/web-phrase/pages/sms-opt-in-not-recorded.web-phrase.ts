import type { WebPhrase } from "akasha/infrastructure/service/akasha-service/web-app/web-phrase/web-phrase.page-type.types.ts"

export const smsOptInNotRecorded = {
  id: "01a0e340-ba01-7cd4-863b-c8d335bacbeb",
  type: "page-type/web-phrase",
  slug: "sms-opt-in-not-recorded",
  title: "Could not record your consent: {why}",
} as const satisfies WebPhrase
