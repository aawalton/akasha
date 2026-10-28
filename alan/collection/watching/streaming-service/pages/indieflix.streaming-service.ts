import type { StreamingService } from "akasha/alan/collection/watching/streaming-service/streaming-service.page-type.types.ts"

export const indieflix = {
  id: "01a18436-345b-7df5-9761-08dac317dc0b",
  type: "page-type/streaming-service",
  slug: "indieflix",
  title: "IndieFlix",
  providerNames: ["IndieFlix", "IndieFlix Shorts Amazon Channel"],
  free: false,
  held: false,
  heldEvidence: "No Monarch charge to IndieFlix was found.",
  createdAt: "2026-10-28T20:31:47.287Z",
  updatedAt: "2026-10-28T20:31:47.287Z",
} as const satisfies StreamingService
