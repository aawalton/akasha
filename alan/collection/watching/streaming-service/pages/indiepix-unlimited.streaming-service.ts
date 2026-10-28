import type { StreamingService } from "akasha/alan/collection/watching/streaming-service/streaming-service.page-type.types.ts"

export const indiepixUnlimited = {
  id: "01a18436-345c-7b65-8c27-4a946c99fb5d",
  type: "page-type/streaming-service",
  slug: "indiepix-unlimited",
  title: "IndiePix Unlimited",
  providerNames: ["IndiePix Unlimited Amazon Channel"],
  free: false,
  held: false,
  heldEvidence: "No Monarch charge to IndiePix Unlimited was found.",
  createdAt: "2026-10-28T20:31:47.287Z",
  updatedAt: "2026-10-28T20:31:47.287Z",
} as const satisfies StreamingService
