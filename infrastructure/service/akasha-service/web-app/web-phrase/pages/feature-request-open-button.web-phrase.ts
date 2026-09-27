import type { WebPhrase } from "akasha/infrastructure/service/akasha-service/web-app/web-phrase/web-phrase.page-type.types.ts"

export const featureRequestOpenButton = {
  id: "01a0e2d0-ea57-77a0-bedd-74ea03be074e",
  type: "page-type/web-phrase",
  slug: "feature-request-open-button",
  title: "Open it for {cost} points",
} as const satisfies WebPhrase
