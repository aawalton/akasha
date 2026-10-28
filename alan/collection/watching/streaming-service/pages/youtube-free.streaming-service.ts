import type { StreamingService } from "akasha/alan/collection/watching/streaming-service/streaming-service.page-type.types.ts"

export const youtubeFree = {
  id: "01a18436-345e-7e1a-aad2-daad6d355c8c",
  type: "page-type/streaming-service",
  slug: "youtube-free",
  title: "YouTube Free",
  providerNames: ["YouTube Free"],
  free: true,
  held: false,
  heldEvidence: "No Monarch charge to YouTube Free was found.",
  createdAt: "2026-10-28T20:31:47.287Z",
  updatedAt: "2026-10-28T20:31:47.287Z",
} as const satisfies StreamingService
