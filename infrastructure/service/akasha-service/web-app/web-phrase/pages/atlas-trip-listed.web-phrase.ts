import type { WebPhrase } from "akasha/infrastructure/service/akasha-service/web-app/web-phrase/web-phrase.page-type.types.ts"

export const atlasTripListed = {
  id: "01a0e2d5-4307-7707-9e0e-4f9c0734b3e5",
  type: "page-type/web-phrase",
  slug: "atlas-trip-listed",
  title: "Stops on this trip",
} as const satisfies WebPhrase
