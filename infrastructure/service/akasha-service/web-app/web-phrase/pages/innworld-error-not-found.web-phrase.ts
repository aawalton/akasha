import type { WebPhrase } from "akasha/infrastructure/service/akasha-service/web-app/web-phrase/web-phrase.page-type.types.ts"

export const innworldErrorNotFound = {
  id: "01a0e340-ba01-70e2-8c68-f8f5efd1737b",
  type: "page-type/web-phrase",
  slug: "innworld-error-not-found",
  title: "No page is here.",
} as const satisfies WebPhrase
