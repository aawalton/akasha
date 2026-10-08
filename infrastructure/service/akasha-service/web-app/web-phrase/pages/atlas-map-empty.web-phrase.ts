import type { WebPhrase } from "akasha/infrastructure/service/akasha-service/web-app/web-phrase/web-phrase.page-type.types.ts"

export const atlasMapEmpty = {
  id: "01a0e2d5-4307-7a6d-bc02-5c83aad5eaad",
  type: "page-type/web-phrase",
  slug: "atlas-map-empty",
  title:
    "No locations with coordinates yet. Add latitude and longitude to your Locations to see them on the map.",
  createdAt: "2026-09-27T12:27:02.279Z",
  updatedAt: "2026-09-27T12:27:05.000Z",
} as const satisfies WebPhrase
