import type { StreamingService } from "akasha/alan/collection/watching/streaming-service/streaming-service.page-type.types.ts"

export const disneyPlus = {
  id: "01a18436-345a-7b41-ae37-91345411d48d",
  type: "page-type/streaming-service",
  slug: "disney-plus",
  title: "Disney+",
  providerNames: ["Disney Plus"],
  free: false,
  held: true,
  heldEvidence:
    "Monarch shows $21.48 charged on 2026-07-08, 2026-08-08, 2026-09-08 and 2026-10-08. Nothing shows whether this is a bundle with Hulu.",
  merchant: "monarch-merchant/disney-plus",
  createdAt: "2026-10-28T20:31:47.287Z",
  updatedAt: "2026-10-28T20:31:47.287Z",
} as const satisfies StreamingService
