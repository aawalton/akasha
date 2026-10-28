import type { StreamingService } from "akasha/alan/collection/watching/streaming-service/streaming-service.page-type.types.ts"

export const midnightPulp = {
  id: "01a18436-345c-7c10-9b3f-c3374d6deb4b",
  type: "page-type/streaming-service",
  slug: "midnight-pulp",
  title: "Midnight Pulp",
  providerNames: ["Midnight Pulp Amazon Channel"],
  free: false,
  held: false,
  heldEvidence: "No Monarch charge to Midnight Pulp was found.",
  createdAt: "2026-10-28T20:31:47.287Z",
  updatedAt: "2026-10-28T20:31:47.287Z",
} as const satisfies StreamingService
