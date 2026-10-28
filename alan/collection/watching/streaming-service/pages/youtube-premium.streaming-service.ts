import type { StreamingService } from "akasha/alan/collection/watching/streaming-service/streaming-service.page-type.types.ts"

export const youtubePremium = {
  id: "01a18436-345e-7b5f-8d46-3eb89bcb7132",
  type: "page-type/streaming-service",
  slug: "youtube-premium",
  title: "YouTube Premium",
  providerNames: ["YouTube Premium"],
  free: false,
  held: true,
  heldEvidence: "Monarch shows $29 charged on 2026-07-20, 2026-08-20, 2026-09-21 and 2026-10-21.",
  merchant: "monarch-merchant/youtube-premium",
  createdAt: "2026-10-28T20:31:47.287Z",
  updatedAt: "2026-10-28T20:31:47.287Z",
} as const satisfies StreamingService
