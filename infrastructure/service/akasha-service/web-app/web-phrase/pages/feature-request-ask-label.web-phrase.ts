import type { WebPhrase } from "akasha/infrastructure/service/akasha-service/web-app/web-phrase/web-phrase.page-type.types.ts"

export const featureRequestAskLabel = {
  id: "01a0e2d0-ea57-75a5-bd52-113d161dc903",
  type: "page-type/web-phrase",
  slug: "feature-request-ask-label",
  title: "What do you want Alan to build?",
} as const satisfies WebPhrase
