import type { StreamingService } from "akasha/alan/collection/watching/streaming-service/streaming-service.page-type.types.ts"

export const paramountPlus = {
  id: "01a18436-345c-79a8-acef-bf853ae53656",
  type: "page-type/streaming-service",
  slug: "paramount-plus",
  title: "Paramount+",
  providerNames: [
    "Paramount Plus",
    "Paramount Plus Apple TV Channel",
    "Paramount Plus Essential",
    "Paramount Plus Premium",
    "Paramount+ Amazon Channel",
  ],
  free: false,
  held: false,
  heldEvidence: "Monarch has a merchant for Paramount+, but no charge to it in 2026 was found.",
  merchant: "monarch-merchant/paramount-plus",
  createdAt: "2026-10-28T20:31:47.287Z",
  updatedAt: "2026-10-28T20:31:47.287Z",
} as const satisfies StreamingService
