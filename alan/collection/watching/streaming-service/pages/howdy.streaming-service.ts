import type { StreamingService } from "akasha/alan/collection/watching/streaming-service/streaming-service.page-type.types.ts"

export const howdy = {
  id: "01a18436-345b-797d-bd54-936dcbd53afb",
  type: "page-type/streaming-service",
  slug: "howdy",
  title: "Howdy",
  providerNames: ["Howdy Amazon Channel"],
  free: false,
  held: false,
  heldEvidence: "No Monarch charge to Howdy was found.",
  createdAt: "2026-10-28T20:31:47.287Z",
  updatedAt: "2026-10-28T20:31:47.287Z",
} as const satisfies StreamingService
