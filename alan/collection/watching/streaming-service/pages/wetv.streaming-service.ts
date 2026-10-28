import type { StreamingService } from "akasha/alan/collection/watching/streaming-service/streaming-service.page-type.types.ts"

export const wetv = {
  id: "01a18436-345d-7f5d-bdc8-fc3b6d080d7b",
  type: "page-type/streaming-service",
  slug: "wetv",
  title: "WeTV",
  providerNames: ["WeTV"],
  free: false,
  held: false,
  heldEvidence: "No Monarch charge to WeTV was found.",
  createdAt: "2026-10-28T20:31:47.287Z",
  updatedAt: "2026-10-28T20:31:47.287Z",
} as const satisfies StreamingService
