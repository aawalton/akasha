import type { StreamingService } from "akasha/alan/collection/watching/streaming-service/streaming-service.page-type.types.ts"

export const passionflix = {
  id: "01a18436-345c-72b3-a423-84aaf8dd7aae",
  type: "page-type/streaming-service",
  slug: "passionflix",
  title: "Passionflix",
  providerNames: ["Passionflix Amazon Channel"],
  free: false,
  held: false,
  heldEvidence: "No Monarch charge to Passionflix was found.",
  createdAt: "2026-10-28T20:31:47.287Z",
  updatedAt: "2026-10-28T20:31:47.287Z",
} as const satisfies StreamingService
