import type { StreamingService } from "akasha/alan/collection/watching/streaming-service/streaming-service.page-type.types.ts"

export const amcPlus = {
  id: "01a18436-3459-7321-b127-ce851f378520",
  type: "page-type/streaming-service",
  slug: "amc-plus",
  title: "AMC+",
  providerNames: ["AMC Plus Apple TV channel", "AMC+"],
  free: false,
  held: false,
  heldEvidence: "No Monarch charge to AMC+ was found.",
  createdAt: "2026-10-28T20:31:47.287Z",
  updatedAt: "2026-10-28T20:31:47.287Z",
} as const satisfies StreamingService
