import type { WebPhrase } from "akasha/infrastructure/service/akasha-service/web-app/web-phrase/web-phrase.page-type.types.ts"

export const atlasTripEmpty = {
  id: "01a0e2d5-4307-7d13-ba7b-493a1d89ccaf",
  type: "page-type/web-phrase",
  slug: "atlas-trip-empty",
  title: "A stop is a location naming this collection. Nothing names this one yet.",
} as const satisfies WebPhrase
