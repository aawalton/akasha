import type { StreamingService } from "akasha/alan/collection/watching/streaming-service/streaming-service.page-type.types.ts"

export const shoutFactoryTv = {
  id: "01a18436-345d-707d-a12d-15021707fd7d",
  type: "page-type/streaming-service",
  slug: "shout-factory-tv",
  title: "Shout! Factory TV",
  providerNames: ["Shout! Factory Amazon Channel", "Shout! Factory TV"],
  free: true,
  held: false,
  heldEvidence: "No Monarch charge to Shout! Factory TV was found.",
  createdAt: "2026-10-28T20:31:47.287Z",
  updatedAt: "2026-10-28T20:31:47.287Z",
} as const satisfies StreamingService
