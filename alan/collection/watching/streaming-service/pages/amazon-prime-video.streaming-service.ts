import type { StreamingService } from "akasha/alan/collection/watching/streaming-service/streaming-service.page-type.types.ts"

export const amazonPrimeVideo = {
  id: "01a18436-3459-7194-8d41-d3a33bb3eec8",
  type: "page-type/streaming-service",
  slug: "amazon-prime-video",
  title: "Amazon Prime Video",
  providerNames: ["Amazon Prime Video", "Amazon Prime Video with Ads"],
  free: false,
  held: false,
  heldEvidence: "No Monarch charge naming Prime Video was found.",
  merchant: "monarch-merchant/amazon",
  createdAt: "2026-10-28T20:31:47.287Z",
  updatedAt: "2026-10-28T20:31:47.287Z",
} as const satisfies StreamingService
