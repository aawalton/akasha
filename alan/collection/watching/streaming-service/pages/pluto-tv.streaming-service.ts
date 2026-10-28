import type { StreamingService } from "akasha/alan/collection/watching/streaming-service/streaming-service.page-type.types.ts"

export const plutoTv = {
  id: "01a18436-345d-7147-8dc3-7cf57947c482",
  type: "page-type/streaming-service",
  slug: "pluto-tv",
  title: "Pluto TV",
  providerNames: ["Pluto TV"],
  free: true,
  held: false,
  heldEvidence: "No Monarch charge to Pluto TV was found.",
  createdAt: "2026-10-28T20:31:47.287Z",
  updatedAt: "2026-10-28T20:31:47.287Z",
} as const satisfies StreamingService
