import type { WebPhrase } from "akasha/infrastructure/service/akasha-service/web-app/web-phrase/web-phrase.page-type.types.ts"

export const dialogCancel = {
  id: "01a0e340-ba00-72ea-a499-759793c2e11a",
  type: "page-type/web-phrase",
  slug: "dialog-cancel",
  title: "Cancel",
} as const satisfies WebPhrase
