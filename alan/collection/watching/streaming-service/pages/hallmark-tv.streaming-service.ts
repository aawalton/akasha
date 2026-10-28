import type { StreamingService } from "akasha/alan/collection/watching/streaming-service/streaming-service.page-type.types.ts"

export const hallmarkTv = {
  id: "01a18436-345b-7db9-8eb2-13390ef563a5",
  type: "page-type/streaming-service",
  slug: "hallmark-tv",
  title: "Hallmark TV",
  providerNames: ["Hallmark TV Amazon Channel"],
  free: false,
  held: false,
  heldEvidence: "No Monarch charge to Hallmark TV was found.",
  createdAt: "2026-10-28T20:31:47.287Z",
  updatedAt: "2026-10-28T20:31:47.287Z",
} as const satisfies StreamingService
