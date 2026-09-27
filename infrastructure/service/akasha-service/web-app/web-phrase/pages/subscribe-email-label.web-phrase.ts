import type { WebPhrase } from "akasha/infrastructure/service/akasha-service/web-app/web-phrase/web-phrase.page-type.types.ts"

export const subscribeEmailLabel = {
  id: "01a0e340-ba01-7d4f-997a-b3e76bc38fc0",
  type: "page-type/web-phrase",
  slug: "subscribe-email-label",
  title: "Email address",
} as const satisfies WebPhrase
