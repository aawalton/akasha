import type { StreamingService } from "akasha/alan/collection/watching/streaming-service/streaming-service.page-type.types.ts"

export const rakutenViki = {
  id: "01a18436-345d-774f-a368-d83f496fa834",
  type: "page-type/streaming-service",
  slug: "rakuten-viki",
  title: "Rakuten Viki",
  providerNames: ["Rakuten Viki"],
  free: false,
  held: false,
  heldEvidence: "No Monarch charge to Rakuten Viki was found.",
  createdAt: "2026-10-28T20:31:47.287Z",
  updatedAt: "2026-10-28T20:31:47.287Z",
} as const satisfies StreamingService
