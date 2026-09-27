import type { WebPhrase } from "akasha/infrastructure/service/akasha-service/web-app/web-phrase/web-phrase.page-type.types.ts"

export const pageCreateTitle = {
  id: "01a0e34e-db7d-721d-91e0-81a729077b1a",
  type: "page-type/web-phrase",
  slug: "page-create-title",
  title: "Create {name}",
} as const satisfies WebPhrase
