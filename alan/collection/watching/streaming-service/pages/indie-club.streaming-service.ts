import type { StreamingService } from "akasha/alan/collection/watching/streaming-service/streaming-service.page-type.types.ts"

export const indieClub = {
  id: "01a18436-345b-7927-99ae-348fdcbd339a",
  type: "page-type/streaming-service",
  slug: "indie-club",
  title: "Indie Club",
  providerNames: ["Indie Club Amazon Channel"],
  free: false,
  held: false,
  heldEvidence: "No Monarch charge to Indie Club was found.",
  createdAt: "2026-10-28T20:31:47.287Z",
  updatedAt: "2026-10-28T20:31:47.287Z",
} as const satisfies StreamingService
