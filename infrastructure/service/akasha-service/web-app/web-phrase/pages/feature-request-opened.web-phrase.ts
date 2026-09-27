import type { WebPhrase } from "akasha/infrastructure/service/akasha-service/web-app/web-phrase/web-phrase.page-type.types.ts"

export const featureRequestOpened = {
  id: "01a0e2d0-ea58-7251-a790-3bff74cef3c8",
  type: "page-type/web-phrase",
  slug: "feature-request-opened",
  title:
    "Your request is open, and the points are behind it. Alan publishes it or denies it himself, and a request he denies gives its boosters their points back.",
} as const satisfies WebPhrase
