import type { StreamingService } from "akasha/alan/collection/watching/streaming-service/streaming-service.page-type.types.ts"

export const hboMax = {
  id: "01a18436-345b-79d7-a133-311d671bb297",
  type: "page-type/streaming-service",
  slug: "hbo-max",
  title: "HBO Max",
  providerNames: ["HBO Max", "HBO Max Amazon Channel"],
  free: false,
  held: false,
  heldEvidence:
    "Monarch shows HBO Max charged monthly in 2023, and no charge since July 2023 was found.",
  createdAt: "2026-10-28T20:31:47.287Z",
  updatedAt: "2026-10-28T20:31:47.287Z",
} as const satisfies StreamingService
