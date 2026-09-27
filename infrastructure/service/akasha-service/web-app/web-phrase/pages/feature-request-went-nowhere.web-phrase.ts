import type { WebPhrase } from "akasha/infrastructure/service/akasha-service/web-app/web-phrase/web-phrase.page-type.types.ts"

export const featureRequestWentNowhere = {
  id: "01a0e3b5-36a5-791e-9e3c-e3fd7b865191",
  type: "page-type/web-phrase",
  slug: "feature-request-went-nowhere",
  title: "the post went nowhere, so nothing moved",
} as const satisfies WebPhrase
