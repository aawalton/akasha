import type { StreamingService } from "akasha/alan/collection/watching/streaming-service/streaming-service.page-type.types.ts"

export const lionsgatePlus = {
  id: "01a18436-345c-772b-9f37-a1babe2330bd",
  type: "page-type/streaming-service",
  slug: "lionsgate-plus",
  title: "Lionsgate+",
  providerNames: ["Lionsgate+ Amazon Channel"],
  free: false,
  held: false,
  heldEvidence: "No Monarch charge to Lionsgate+ was found.",
  createdAt: "2026-10-28T20:31:47.287Z",
  updatedAt: "2026-10-28T20:31:47.287Z",
} as const satisfies StreamingService
