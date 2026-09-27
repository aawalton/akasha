import type { WebPhrase } from "akasha/infrastructure/service/akasha-service/web-app/web-phrase/web-phrase.page-type.types.ts"

export const atlasTripCountSome = {
  id: "01a0e2d5-4307-7a2a-b9b8-c5aaedaf2bd8",
  type: "page-type/web-phrase",
  slug: "atlas-trip-count-some",
  title: "Showing the first {shown} of {total} stops on this trip.",
} as const satisfies WebPhrase
