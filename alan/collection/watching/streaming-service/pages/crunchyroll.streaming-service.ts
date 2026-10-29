import type { StreamingService } from "akasha/alan/collection/watching/streaming-service/streaming-service.page-type.types.ts"

export const crunchyroll = {
  id: "01a18436-345a-7cee-95cf-3d65874fdbc8",
  type: "page-type/streaming-service",
  slug: "crunchyroll",
  title: "Crunchyroll",
  providerNames: ["Crunchyroll", "Crunchyroll Amazon Channel"],
  free: false,
  held: true,
  heldEvidence:
    "Alan said on 2026-10-29 that he added a Crunchyroll subscription. Monarch showed no charge from August through October 2026 before that.",
  merchant: "monarch-merchant/crunchyroll",
  createdAt: "2026-10-28T20:31:47.287Z",
  updatedAt: "2026-10-29T14:17:14.644Z",
} as const satisfies StreamingService
