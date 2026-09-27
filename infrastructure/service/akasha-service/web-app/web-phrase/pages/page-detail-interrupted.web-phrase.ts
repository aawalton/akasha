import type { WebPhrase } from "akasha/infrastructure/service/akasha-service/web-app/web-phrase/web-phrase.page-type.types.ts"

export const pageDetailInterrupted = {
  id: "01a0e345-97dc-7b26-93e0-65df5796b434",
  type: "page-type/web-phrase",
  slug: "page-detail-interrupted",
  title: "An unexpected error interrupted this page.",
} as const satisfies WebPhrase
