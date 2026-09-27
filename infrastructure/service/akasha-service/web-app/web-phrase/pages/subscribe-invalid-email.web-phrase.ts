import type { WebPhrase } from "akasha/infrastructure/service/akasha-service/web-app/web-phrase/web-phrase.page-type.types.ts"

export const subscribeInvalidEmail = {
  id: "01a0e340-ba01-706d-b949-1e7463ef7fb2",
  type: "page-type/web-phrase",
  slug: "subscribe-invalid-email",
  title: "Please enter a valid email address.",
} as const satisfies WebPhrase
