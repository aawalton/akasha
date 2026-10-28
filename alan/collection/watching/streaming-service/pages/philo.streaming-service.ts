import type { StreamingService } from "akasha/alan/collection/watching/streaming-service/streaming-service.page-type.types.ts"

export const philo = {
  id: "01a18436-345c-7c51-a2b8-b614b47d53e1",
  type: "page-type/streaming-service",
  slug: "philo",
  title: "Philo",
  providerNames: ["Philo"],
  free: false,
  held: false,
  heldEvidence: "No Monarch charge to Philo was found.",
  createdAt: "2026-10-28T20:31:47.287Z",
  updatedAt: "2026-10-28T20:31:47.287Z",
} as const satisfies StreamingService
