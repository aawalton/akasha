import type { WebPhrase } from "akasha/infrastructure/service/akasha-service/web-app/web-phrase/web-phrase.page-type.types.ts"

export const errorScreenUnexpected = {
  id: "01a0e340-ba01-7531-97c9-b5ede96be048",
  type: "page-type/web-phrase",
  slug: "error-screen-unexpected",
  title: "An unexpected error occurred.",
} as const satisfies WebPhrase
