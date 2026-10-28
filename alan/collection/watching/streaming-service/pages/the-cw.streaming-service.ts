import type { StreamingService } from "akasha/alan/collection/watching/streaming-service/streaming-service.page-type.types.ts"

export const theCw = {
  id: "01a18436-345d-78fe-af36-f5bdda8b74a1",
  type: "page-type/streaming-service",
  slug: "the-cw",
  title: "The CW",
  providerNames: ["The CW"],
  free: true,
  held: false,
  heldEvidence: "No Monarch charge to The CW was found.",
  createdAt: "2026-10-28T20:31:47.287Z",
  updatedAt: "2026-10-28T20:31:47.287Z",
} as const satisfies StreamingService
