import type { StreamingService } from "akasha/alan/collection/watching/streaming-service/streaming-service.page-type.types.ts"

export const fubotv = {
  id: "01a18436-345a-7faf-b670-928687442a40",
  type: "page-type/streaming-service",
  slug: "fubotv",
  title: "fuboTV",
  providerNames: ["fuboTV"],
  free: false,
  held: false,
  heldEvidence: "No Monarch charge to fuboTV was found.",
  createdAt: "2026-10-28T20:31:47.287Z",
  updatedAt: "2026-10-28T20:31:47.287Z",
} as const satisfies StreamingService
