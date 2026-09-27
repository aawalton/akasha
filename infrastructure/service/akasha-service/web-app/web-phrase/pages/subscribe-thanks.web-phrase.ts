import type { WebPhrase } from "akasha/infrastructure/service/akasha-service/web-app/web-phrase/web-phrase.page-type.types.ts"

export const subscribeThanks = {
  id: "01a0e340-ba01-73ea-9f1b-916a8df50f06",
  type: "page-type/web-phrase",
  slug: "subscribe-thanks",
  title: "Thanks — you're on the list.",
} as const satisfies WebPhrase
