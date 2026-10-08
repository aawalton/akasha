import type { WebPhrase } from "akasha/infrastructure/service/akasha-service/web-app/web-phrase/web-phrase.page-type.types.ts"

export const atlasTripCount = {
  id: "01a0e2d5-4307-705a-a8d4-db2c6f1e3caf",
  type: "page-type/web-phrase",
  slug: "atlas-trip-count",
  title: "{count} stops on this trip.",
  createdAt: "2026-09-27T12:27:02.279Z",
  updatedAt: "2026-09-27T12:27:05.000Z",
} as const satisfies WebPhrase
