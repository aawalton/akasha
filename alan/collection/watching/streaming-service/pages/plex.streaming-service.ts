import type { StreamingService } from "akasha/alan/collection/watching/streaming-service/streaming-service.page-type.types.ts"

export const plex = {
  id: "01a18436-345c-7d8c-919c-bb04f1c1c5c2",
  type: "page-type/streaming-service",
  slug: "plex",
  title: "Plex",
  providerNames: ["Plex", "Plex Channel"],
  free: true,
  held: false,
  heldEvidence: "No Monarch charge to Plex was found.",
  createdAt: "2026-10-28T20:31:47.287Z",
  updatedAt: "2026-10-28T20:31:47.287Z",
} as const satisfies StreamingService
