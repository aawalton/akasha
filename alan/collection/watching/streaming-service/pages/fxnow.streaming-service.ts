import type { StreamingService } from "akasha/alan/collection/watching/streaming-service/streaming-service.page-type.types.ts"

export const fxnow = {
  id: "01a18436-345a-7a28-b032-99baf525736d",
  type: "page-type/streaming-service",
  slug: "fxnow",
  title: "FXNow",
  providerNames: ["FXNow"],
  free: false,
  held: false,
  heldEvidence: "No Monarch charge to FXNow was found.",
  createdAt: "2026-10-28T20:31:47.287Z",
  updatedAt: "2026-10-28T20:31:47.287Z",
} as const satisfies StreamingService
