import type { WebPhrase } from "akasha/infrastructure/service/akasha-service/web-app/web-phrase/web-phrase.page-type.types.ts"

export const subscribePlaceholder = {
  id: "01a0e340-ba01-7671-bb18-acff135cfb04",
  type: "page-type/web-phrase",
  slug: "subscribe-placeholder",
  title: "you@example.com",
} as const satisfies WebPhrase
