import type { StreamingService } from "akasha/alan/collection/watching/streaming-service/streaming-service.page-type.types.ts"

export const filmzie = {
  id: "01a18436-345a-7797-83a0-e773d3d98647",
  type: "page-type/streaming-service",
  slug: "filmzie",
  title: "Filmzie",
  providerNames: ["Filmzie"],
  free: true,
  held: false,
  heldEvidence: "No Monarch charge to Filmzie was found.",
  createdAt: "2026-10-28T20:31:47.287Z",
  updatedAt: "2026-10-28T20:31:47.287Z",
} as const satisfies StreamingService
