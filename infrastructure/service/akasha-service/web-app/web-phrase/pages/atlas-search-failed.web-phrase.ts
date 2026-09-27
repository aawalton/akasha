import type { WebPhrase } from "akasha/infrastructure/service/akasha-service/web-app/web-phrase/web-phrase.page-type.types.ts"

export const atlasSearchFailed = {
  id: "01a0e2d6-e63b-7bc1-958d-1f4b796f4051",
  type: "page-type/web-phrase",
  slug: "atlas-search-failed",
  title: "Search failed. Please try again.",
} as const satisfies WebPhrase
