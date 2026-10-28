import type { StreamingService } from "akasha/alan/collection/watching/streaming-service/streaming-service.page-type.types.ts"

export const dove = {
  id: "01a18436-345a-7e15-9acc-994de20ccec2",
  type: "page-type/streaming-service",
  slug: "dove",
  title: "Dove",
  providerNames: ["Dove Amazon Channel"],
  free: false,
  held: false,
  heldEvidence: "No Monarch charge to Dove was found.",
  createdAt: "2026-10-28T20:31:47.287Z",
  updatedAt: "2026-10-28T20:31:47.287Z",
} as const satisfies StreamingService
