import type { StreamingService } from "akasha/alan/collection/watching/streaming-service/streaming-service.page-type.types.ts"

export const vix = {
  id: "01a18436-345d-7bc5-a33a-6e895c7a20d3",
  type: "page-type/streaming-service",
  slug: "vix",
  title: "ViX",
  providerNames: ["VIX"],
  free: false,
  held: false,
  heldEvidence: "No Monarch charge to ViX was found.",
  createdAt: "2026-10-28T20:31:47.287Z",
  updatedAt: "2026-10-28T20:31:47.287Z",
} as const satisfies StreamingService
