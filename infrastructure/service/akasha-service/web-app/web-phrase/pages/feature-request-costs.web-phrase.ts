import type { WebPhrase } from "akasha/infrastructure/service/akasha-service/web-app/web-phrase/web-phrase.page-type.types.ts"

export const featureRequestCosts = {
  id: "01a0e2d0-ea57-73ae-868a-23bed577bae8",
  type: "page-type/web-phrase",
  slug: "feature-request-costs",
  title: "Opening a request costs {cost} points.",
} as const satisfies WebPhrase
