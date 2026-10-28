import type { StreamingService } from "akasha/alan/collection/watching/streaming-service/streaming-service.page-type.types.ts"

export const tubi = {
  id: "01a18436-345d-74d6-a187-00ea44715508",
  type: "page-type/streaming-service",
  slug: "tubi",
  title: "Tubi",
  providerNames: ["Tubi TV"],
  free: true,
  held: false,
  heldEvidence: "No Monarch charge to Tubi was found.",
  createdAt: "2026-10-28T20:31:47.287Z",
  updatedAt: "2026-10-28T20:31:47.287Z",
} as const satisfies StreamingService
