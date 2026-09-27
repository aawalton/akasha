import type { WebPhrase } from "akasha/infrastructure/service/akasha-service/web-app/web-phrase/web-phrase.page-type.types.ts"

export const atlasTripEmptyTitle = {
  id: "01a0e2d5-4307-7e54-a9e8-a9d44cc6fc73",
  type: "page-type/web-phrase",
  slug: "atlas-trip-empty-title",
  title: "No stops on this trip yet",
} as const satisfies WebPhrase
