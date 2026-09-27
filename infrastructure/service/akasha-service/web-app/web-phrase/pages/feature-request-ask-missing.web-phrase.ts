import type { WebPhrase } from "akasha/infrastructure/service/akasha-service/web-app/web-phrase/web-phrase.page-type.types.ts"

export const featureRequestAskMissing = {
  id: "01a0e3b5-36a5-7631-8a22-7cfd0256f03c",
  type: "page-type/web-phrase",
  slug: "feature-request-ask-missing",
  title: "a feature request says what it asks for",
} as const satisfies WebPhrase
