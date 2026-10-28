import type { StreamingService } from "akasha/alan/collection/watching/streaming-service/streaming-service.page-type.types.ts"

export const greatAmericanPureFlix = {
  id: "01a18436-345b-7c18-ac6e-d8b2e4648c47",
  type: "page-type/streaming-service",
  slug: "great-american-pure-flix",
  title: "Great American Pure Flix",
  providerNames: ["Great American Pure Flix Amazon Channel", "Pure Flix"],
  free: false,
  held: false,
  heldEvidence: "No Monarch charge to Great American Pure Flix was found.",
  createdAt: "2026-10-28T20:31:47.287Z",
  updatedAt: "2026-10-28T20:31:47.287Z",
} as const satisfies StreamingService
