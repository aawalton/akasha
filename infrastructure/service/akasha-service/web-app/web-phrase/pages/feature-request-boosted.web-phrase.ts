import type { WebPhrase } from "akasha/infrastructure/service/akasha-service/web-app/web-phrase/web-phrase.page-type.types.ts"

export const featureRequestBoosted = {
  id: "01a0e2d0-ea57-7b4b-8bcb-e5ee3c2ba39d",
  type: "page-type/web-phrase",
  slug: "feature-request-boosted",
  title: "Your points are behind this request. They stay there until Alan builds it or denies it.",
} as const satisfies WebPhrase
