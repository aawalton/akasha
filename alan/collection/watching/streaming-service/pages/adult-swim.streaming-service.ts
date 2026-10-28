import type { StreamingService } from "akasha/alan/collection/watching/streaming-service/streaming-service.page-type.types.ts"

export const adultSwim = {
  id: "01a18436-3458-72f8-bd57-23dc12b594e4",
  type: "page-type/streaming-service",
  slug: "adult-swim",
  title: "Adult Swim",
  providerNames: ["Adult Swim"],
  free: false,
  held: false,
  heldEvidence: "No Monarch charge to Adult Swim was found.",
  createdAt: "2026-10-28T20:31:47.287Z",
  updatedAt: "2026-10-28T20:31:47.287Z",
} as const satisfies StreamingService
