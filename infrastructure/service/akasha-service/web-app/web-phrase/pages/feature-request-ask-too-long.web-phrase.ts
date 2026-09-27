import type { WebPhrase } from "akasha/infrastructure/service/akasha-service/web-app/web-phrase/web-phrase.page-type.types.ts"

export const featureRequestAskTooLong = {
  id: "01a0e3b5-36a5-7e72-a436-27716a527b2c",
  type: "page-type/web-phrase",
  slug: "feature-request-ask-too-long",
  title: "an ask holds {holds} characters, and this one runs to {length}",
} as const satisfies WebPhrase
