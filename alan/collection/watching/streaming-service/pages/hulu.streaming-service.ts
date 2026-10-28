import type { StreamingService } from "akasha/alan/collection/watching/streaming-service/streaming-service.page-type.types.ts"

export const hulu = {
  id: "01a18436-345b-7801-8b7f-405034802cf1",
  type: "page-type/streaming-service",
  slug: "hulu",
  title: "Hulu",
  providerNames: ["Hulu"],
  free: false,
  held: false,
  heldEvidence:
    "No Monarch charge to Hulu was found, and nothing shows the Disney+ charge is a bundle with Hulu.",
  createdAt: "2026-10-28T20:31:47.287Z",
  updatedAt: "2026-10-28T20:31:47.287Z",
} as const satisfies StreamingService
