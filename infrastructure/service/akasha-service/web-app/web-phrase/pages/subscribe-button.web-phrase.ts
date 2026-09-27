import type { WebPhrase } from "akasha/infrastructure/service/akasha-service/web-app/web-phrase/web-phrase.page-type.types.ts"

export const subscribeButton = {
  id: "01a0e340-ba01-703b-98db-c761a9a053dd",
  type: "page-type/web-phrase",
  slug: "subscribe-button",
  title: "Subscribe",
} as const satisfies WebPhrase
