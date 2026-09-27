import type { WebPhrase } from "akasha/infrastructure/service/akasha-service/web-app/web-phrase/web-phrase.page-type.types.ts"

export const atlasMapEmpty = {
  id: "01a0e2d5-4307-7a6d-bc02-5c83aad5eaad",
  type: "page-type/web-phrase",
  slug: "atlas-map-empty",
  title:
    "No locations with coordinates yet. Add latitude and longitude to your Locations to see them on the map.",
} as const satisfies WebPhrase
