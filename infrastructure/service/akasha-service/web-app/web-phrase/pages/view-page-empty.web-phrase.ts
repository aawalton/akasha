import type { WebPhrase } from "akasha/infrastructure/service/akasha-service/web-app/web-phrase/web-phrase.page-type.types.ts"

export const viewPageEmpty = {
  id: "01a0e2da-e74a-7d2b-b6b2-2431142fa43e",
  type: "page-type/web-phrase",
  slug: "view-page-empty",
  title: "Create a view to get started.",
} as const satisfies WebPhrase
