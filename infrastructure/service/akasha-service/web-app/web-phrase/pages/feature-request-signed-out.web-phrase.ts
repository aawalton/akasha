import type { WebPhrase } from "akasha/infrastructure/service/akasha-service/web-app/web-phrase/web-phrase.page-type.types.ts"

export const featureRequestSignedOut = {
  id: "01a0e340-ba01-73a7-b152-b15c8bdcc773",
  type: "page-type/web-phrase",
  slug: "feature-request-signed-out",
  title: "sign in to open a request or to boost one",
} as const satisfies WebPhrase
