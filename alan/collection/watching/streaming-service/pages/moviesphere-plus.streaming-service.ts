import type { StreamingService } from "akasha/alan/collection/watching/streaming-service/streaming-service.page-type.types.ts"

export const moviespherePlus = {
  id: "01a18436-345c-7732-903c-1f12ef1aef75",
  type: "page-type/streaming-service",
  slug: "moviesphere-plus",
  title: "MovieSphere+",
  providerNames: ["MovieSphere+ Amazon Channel"],
  free: false,
  held: false,
  heldEvidence: "No Monarch charge to MovieSphere+ was found.",
  createdAt: "2026-10-28T20:31:47.287Z",
  updatedAt: "2026-10-28T20:31:47.287Z",
} as const satisfies StreamingService
