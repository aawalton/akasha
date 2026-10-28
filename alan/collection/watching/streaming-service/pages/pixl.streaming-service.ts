import type { StreamingService } from "akasha/alan/collection/watching/streaming-service/streaming-service.page-type.types.ts"

export const pixl = {
  id: "01a18436-345c-70f0-b9f6-aca5cf926dff",
  type: "page-type/streaming-service",
  slug: "pixl",
  title: "PixL",
  providerNames: ["PixL Amazon Channel"],
  free: false,
  held: false,
  heldEvidence: "No Monarch charge to PixL was found.",
  createdAt: "2026-10-28T20:31:47.287Z",
  updatedAt: "2026-10-28T20:31:47.287Z",
} as const satisfies StreamingService
