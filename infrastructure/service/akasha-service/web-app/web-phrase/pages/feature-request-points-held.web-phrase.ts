import type { WebPhrase } from "akasha/infrastructure/service/akasha-service/web-app/web-phrase/web-phrase.page-type.types.ts"

export const featureRequestPointsHeld = {
  id: "01a0e2d0-ea58-7301-846c-ec15f977f8b1",
  type: "page-type/web-phrase",
  slug: "feature-request-points-held",
  title: "You hold {balance} points.",
  createdAt: "2026-09-27T12:22:17.432Z",
  updatedAt: "2026-09-27T12:22:20.000Z",
} as const satisfies WebPhrase
