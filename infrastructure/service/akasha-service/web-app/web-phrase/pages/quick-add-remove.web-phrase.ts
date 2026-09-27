import type { WebPhrase } from "akasha/infrastructure/service/akasha-service/web-app/web-phrase/web-phrase.page-type.types.ts"

export const quickAddRemove = {
  id: "01a0e350-fe36-75c0-a431-ab86ca62d5ee",
  type: "page-type/web-phrase",
  slug: "quick-add-remove",
  title: "Remove {chip}",
} as const satisfies WebPhrase
