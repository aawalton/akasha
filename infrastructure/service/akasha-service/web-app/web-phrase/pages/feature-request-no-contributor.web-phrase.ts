import type { WebPhrase } from "akasha/infrastructure/service/akasha-service/web-app/web-phrase/web-phrase.page-type.types.ts"

export const featureRequestNoContributor = {
  id: "01a0e3b5-36a5-7710-b7b6-bf239eac827f",
  type: "page-type/web-phrase",
  slug: "feature-request-no-contributor",
  title: "`{contributor}` names no contributor",
  createdAt: "2026-09-27T16:31:39.173Z",
  updatedAt: "2026-09-27T16:31:44.000Z",
} as const satisfies WebPhrase
