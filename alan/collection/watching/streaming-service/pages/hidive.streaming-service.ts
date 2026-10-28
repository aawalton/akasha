import type { StreamingService } from "akasha/alan/collection/watching/streaming-service/streaming-service.page-type.types.ts"

export const hidive = {
  id: "01a18436-345b-705e-b78c-c5ca5fedb3bd",
  type: "page-type/streaming-service",
  slug: "hidive",
  title: "HIDIVE",
  providerNames: ["HiDive", "Hidive Amazon Channel"],
  free: false,
  held: false,
  heldEvidence: "No Monarch charge to HIDIVE was found.",
  createdAt: "2026-10-28T20:31:47.287Z",
  updatedAt: "2026-10-28T20:31:47.287Z",
} as const satisfies StreamingService
