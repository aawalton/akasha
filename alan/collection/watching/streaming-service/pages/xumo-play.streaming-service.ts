import type { StreamingService } from "akasha/alan/collection/watching/streaming-service/streaming-service.page-type.types.ts"

export const xumoPlay = {
  id: "01a18436-345e-74ac-b5e7-d9a24ad80a32",
  type: "page-type/streaming-service",
  slug: "xumo-play",
  title: "Xumo Play",
  providerNames: ["Xumo Play"],
  free: true,
  held: false,
  heldEvidence: "No Monarch charge to Xumo Play was found.",
  createdAt: "2026-10-28T20:31:47.287Z",
  updatedAt: "2026-10-28T20:31:47.287Z",
} as const satisfies StreamingService
