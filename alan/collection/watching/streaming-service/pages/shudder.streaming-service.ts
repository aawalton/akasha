import type { StreamingService } from "akasha/alan/collection/watching/streaming-service/streaming-service.page-type.types.ts"

export const shudder = {
  id: "01a18436-345d-7c32-bbb0-a66c78513af7",
  type: "page-type/streaming-service",
  slug: "shudder",
  title: "Shudder",
  providerNames: ["Shudder"],
  free: false,
  held: false,
  heldEvidence: "No Monarch charge to Shudder was found.",
  createdAt: "2026-10-28T20:31:47.287Z",
  updatedAt: "2026-10-28T20:31:47.287Z",
} as const satisfies StreamingService
