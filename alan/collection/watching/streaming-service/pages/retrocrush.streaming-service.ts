import type { StreamingService } from "akasha/alan/collection/watching/streaming-service/streaming-service.page-type.types.ts"

export const retrocrush = {
  id: "01a18436-345d-7599-836f-a0799156cf7d",
  type: "page-type/streaming-service",
  slug: "retrocrush",
  title: "RetroCrush",
  providerNames: ["RetroCrush Amazon Channel"],
  free: true,
  held: false,
  heldEvidence: "No Monarch charge to RetroCrush was found.",
  createdAt: "2026-10-28T20:31:47.287Z",
  updatedAt: "2026-10-28T20:31:47.287Z",
} as const satisfies StreamingService
