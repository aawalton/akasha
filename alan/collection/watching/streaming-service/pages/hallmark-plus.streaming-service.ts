import type { StreamingService } from "akasha/alan/collection/watching/streaming-service/streaming-service.page-type.types.ts"

export const hallmarkPlus = {
  id: "01a18436-345b-7d38-9ea8-3d671df7e0b5",
  type: "page-type/streaming-service",
  slug: "hallmark-plus",
  title: "Hallmark+",
  providerNames: ["Hallmark+ Amazon Channel", "Hallmark+ Apple TV channel"],
  free: false,
  held: false,
  heldEvidence: "No Monarch charge to Hallmark+ was found.",
  createdAt: "2026-10-28T20:31:47.287Z",
  updatedAt: "2026-10-28T20:31:47.287Z",
} as const satisfies StreamingService
