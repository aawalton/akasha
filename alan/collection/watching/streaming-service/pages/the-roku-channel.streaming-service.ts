import type { StreamingService } from "akasha/alan/collection/watching/streaming-service/streaming-service.page-type.types.ts"

export const theRokuChannel = {
  id: "01a18436-345d-774b-8473-4df82fdb164b",
  type: "page-type/streaming-service",
  slug: "the-roku-channel",
  title: "The Roku Channel",
  providerNames: ["The Roku Channel"],
  free: true,
  held: false,
  heldEvidence: "No Monarch charge to The Roku Channel was found.",
  createdAt: "2026-10-28T20:31:47.287Z",
  updatedAt: "2026-10-28T20:31:47.287Z",
} as const satisfies StreamingService
