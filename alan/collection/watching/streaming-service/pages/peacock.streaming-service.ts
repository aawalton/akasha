import type { StreamingService } from "akasha/alan/collection/watching/streaming-service/streaming-service.page-type.types.ts"

export const peacock = {
  id: "01a18436-345c-7197-bb0c-452420854788",
  type: "page-type/streaming-service",
  slug: "peacock",
  title: "Peacock",
  providerNames: ["Peacock Premium", "Peacock Premium Plus"],
  free: false,
  held: false,
  heldEvidence:
    "Monarch shows Peacock charged in January and February 2024, and no charge since was found.",
  createdAt: "2026-10-28T20:31:47.287Z",
  updatedAt: "2026-10-28T20:31:47.287Z",
} as const satisfies StreamingService
