import type { WebPhrase } from "akasha/infrastructure/service/akasha-service/web-app/web-phrase/web-phrase.page-type.types.ts"

export const quickAddRemoveDefault = {
  id: "01a0e350-fe35-73e6-b213-16a203f10fe0",
  type: "page-type/web-phrase",
  slug: "quick-add-remove-default",
  title: "Remove default {chip}",
} as const satisfies WebPhrase
