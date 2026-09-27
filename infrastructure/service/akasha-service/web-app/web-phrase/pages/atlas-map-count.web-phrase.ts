import type { WebPhrase } from "akasha/infrastructure/service/akasha-service/web-app/web-phrase/web-phrase.page-type.types.ts"

export const atlasMapCount = {
  id: "01a0e2d5-4307-7f83-bed0-d7a36b58dda2",
  type: "page-type/web-phrase",
  slug: "atlas-map-count",
  title: "Showing {count} locations on the map. (live check)",
} as const satisfies WebPhrase
