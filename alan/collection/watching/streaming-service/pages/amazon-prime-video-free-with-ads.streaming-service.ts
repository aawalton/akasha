import type { StreamingService } from "akasha/alan/collection/watching/streaming-service/streaming-service.page-type.types.ts"

export const amazonPrimeVideoFreeWithAds = {
  id: "01a18436-3459-7e97-80d0-ef5db6bcc997",
  type: "page-type/streaming-service",
  slug: "amazon-prime-video-free-with-ads",
  title: "Prime Video Free with Ads",
  providerNames: ["Amazon Prime Video Free with Ads"],
  free: true,
  held: false,
  heldEvidence: "No Monarch charge naming Prime Video was found.",
  createdAt: "2026-10-28T20:31:47.287Z",
  updatedAt: "2026-10-28T20:31:47.287Z",
} as const satisfies StreamingService
