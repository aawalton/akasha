import type { StreamingService } from "akasha/alan/collection/watching/streaming-service/streaming-service.page-type.types.ts"

export const youtubeTv = {
  id: "01a18436-345e-742b-bdbf-ccd99be1a2ea",
  type: "page-type/streaming-service",
  slug: "youtube-tv",
  title: "YouTube TV",
  providerNames: ["YouTube TV"],
  free: false,
  held: false,
  heldEvidence: "No Monarch charge to YouTube TV was found.",
  createdAt: "2026-10-28T20:31:47.287Z",
  updatedAt: "2026-10-28T20:31:47.287Z",
} as const satisfies StreamingService
