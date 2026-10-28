import type { StreamingService } from "akasha/alan/collection/watching/streaming-service/streaming-service.page-type.types.ts"

export const upFaithAndFamily = {
  id: "01a18436-345d-7ce0-9c5e-b1b77adf72e2",
  type: "page-type/streaming-service",
  slug: "up-faith-and-family",
  title: "UP Faith & Family",
  providerNames: ["UP Faith & Family Amazon Channel", "UP Faith & Family Apple TV channel"],
  free: false,
  held: false,
  heldEvidence: "No Monarch charge to UP Faith & Family was found.",
  createdAt: "2026-10-28T20:31:47.287Z",
  updatedAt: "2026-10-28T20:31:47.287Z",
} as const satisfies StreamingService
