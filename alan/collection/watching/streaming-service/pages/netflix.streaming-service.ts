import type { StreamingService } from "akasha/alan/collection/watching/streaming-service/streaming-service.page-type.types.ts"

export const netflix = {
  id: "01a18436-345c-7aec-ac78-1a802ffe4515",
  type: "page-type/streaming-service",
  slug: "netflix",
  title: "Netflix",
  providerNames: ["Netflix", "Netflix Standard with Ads"],
  free: false,
  held: true,
  heldEvidence:
    "Monarch shows $21.48 charged on 2026-07-10, 2026-08-10, 2026-09-08 and 2026-10-08. Monarch labels the 2026-09-08 charge Disney, but its statement line reads Netflix.",
  merchant: "monarch-merchant/netflix",
  createdAt: "2026-10-28T20:31:47.287Z",
  updatedAt: "2026-10-28T20:31:47.287Z",
} as const satisfies StreamingService
