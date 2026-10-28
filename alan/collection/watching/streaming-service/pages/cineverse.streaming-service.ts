import type { StreamingService } from "akasha/alan/collection/watching/streaming-service/streaming-service.page-type.types.ts"

export const cineverse = {
  id: "01a18436-3459-7734-a2d1-c5bd49d06b19",
  type: "page-type/streaming-service",
  slug: "cineverse",
  title: "Cineverse",
  providerNames: ["Cineverse", "Cineverse Amazon Channel"],
  free: false,
  held: false,
  heldEvidence: "No Monarch charge to Cineverse was found.",
  createdAt: "2026-10-28T20:31:47.287Z",
  updatedAt: "2026-10-28T20:31:47.287Z",
} as const satisfies StreamingService
