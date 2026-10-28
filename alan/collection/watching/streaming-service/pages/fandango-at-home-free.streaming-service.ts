import type { StreamingService } from "akasha/alan/collection/watching/streaming-service/streaming-service.page-type.types.ts"

export const fandangoAtHomeFree = {
  id: "01a18436-345a-7cec-b9d5-df17fa75035a",
  type: "page-type/streaming-service",
  slug: "fandango-at-home-free",
  title: "Fandango at Home Free",
  providerNames: ["Fandango at Home Free"],
  free: true,
  held: false,
  heldEvidence: "No Monarch charge to Fandango at Home was found.",
  createdAt: "2026-10-28T20:31:47.287Z",
  updatedAt: "2026-10-28T20:31:47.287Z",
} as const satisfies StreamingService
