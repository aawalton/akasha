import type { WebPhrase } from "akasha/infrastructure/service/akasha-service/web-app/web-phrase/web-phrase.page-type.types.ts"

export const viewFailedToLoad = {
  id: "01a0e340-ba02-7cf3-99a0-84950a8b4823",
  type: "page-type/web-phrase",
  slug: "view-failed-to-load",
  title: "This view failed to load: {why}",
} as const satisfies WebPhrase
