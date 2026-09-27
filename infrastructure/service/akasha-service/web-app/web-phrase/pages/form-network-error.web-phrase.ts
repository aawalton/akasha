import type { WebPhrase } from "akasha/infrastructure/service/akasha-service/web-app/web-phrase/web-phrase.page-type.types.ts"

export const formNetworkError = {
  id: "01a0e340-ba01-7af6-a2cb-f201f8ec35da",
  type: "page-type/web-phrase",
  slug: "form-network-error",
  title: "Network error. Please try again.",
} as const satisfies WebPhrase
