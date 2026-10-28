import type { StreamingService } from "akasha/alan/collection/watching/streaming-service/streaming-service.page-type.types.ts"

export const criterionChannel = {
  id: "01a18436-3459-7c0a-a22f-fc488262ff0f",
  type: "page-type/streaming-service",
  slug: "criterion-channel",
  title: "Criterion Channel",
  providerNames: ["Criterion Channel"],
  free: false,
  held: false,
  heldEvidence: "No Monarch charge to the Criterion Channel was found.",
  createdAt: "2026-10-28T20:31:47.287Z",
  updatedAt: "2026-10-28T20:31:47.287Z",
} as const satisfies StreamingService
