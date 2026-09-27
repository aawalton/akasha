import type { WebPhrase } from "akasha/infrastructure/service/akasha-service/web-app/web-phrase/web-phrase.page-type.types.ts"

export const errorScreenNotFound = {
  id: "01a0e340-ba01-7dc9-9454-78014e332ffd",
  type: "page-type/web-phrase",
  slug: "error-screen-not-found",
  title: "The requested page could not be found (live check).",
} as const satisfies WebPhrase
