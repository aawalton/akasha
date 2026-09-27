import type { WebPhrase } from "akasha/infrastructure/service/akasha-service/web-app/web-phrase/web-phrase.page-type.types.ts"

export const featureRequestNoSuchRequest = {
  id: "01a0e3b5-36a5-7343-aba9-b4c388a58594",
  type: "page-type/web-phrase",
  slug: "feature-request-no-such-request",
  title: "`{request}` names no feature request of this product",
} as const satisfies WebPhrase
