import type { StreamingService } from "akasha/alan/collection/watching/streaming-service/streaming-service.page-type.types.ts"

export const amasianTv = {
  id: "01a18436-3458-70df-b812-b75c45ccc3a9",
  type: "page-type/streaming-service",
  slug: "amasian-tv",
  title: "Amasian TV",
  providerNames: ["Amasian TV"],
  free: false,
  held: false,
  heldEvidence: "No Monarch charge to Amasian TV was found.",
  createdAt: "2026-10-28T20:31:47.287Z",
  updatedAt: "2026-10-28T20:31:47.287Z",
} as const satisfies StreamingService
