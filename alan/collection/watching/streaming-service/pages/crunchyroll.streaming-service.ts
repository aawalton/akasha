import type { StreamingService } from "akasha/alan/collection/watching/streaming-service/streaming-service.page-type.types.ts"

export const crunchyroll = {
  id: "01a18436-345a-7cee-95cf-3d65874fdbc8",
  type: "page-type/streaming-service",
  slug: "crunchyroll",
  title: "Crunchyroll",
  providerNames: ["Crunchyroll", "Crunchyroll Amazon Channel"],
  free: false,
  held: false,
  heldEvidence:
    "Monarch shows $7.99 charged on 2026-01-02, 2026-02-02 and 2026-03-02, $9.99 on 2026-04-02 and 2026-05-02, and $9.13 on 2026-07-23, and no charge from August through October 2026.",
  merchant: "monarch-merchant/crunchyroll",
  createdAt: "2026-10-28T20:31:47.287Z",
  updatedAt: "2026-10-28T20:31:47.287Z",
} as const satisfies StreamingService
