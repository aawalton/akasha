import type { WebPhrase } from "akasha/infrastructure/service/akasha-service/web-app/web-phrase/web-phrase.page-type.types.ts"

export const subscribeInvalidBody = {
  id: "01a0e340-ba01-7a2e-ad3e-2070496df908",
  type: "page-type/web-phrase",
  slug: "subscribe-invalid-body",
  title: "Invalid JSON body",
} as const satisfies WebPhrase
