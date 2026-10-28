import type { StreamingService } from "akasha/alan/collection/watching/streaming-service/streaming-service.page-type.types.ts"

export const historyVault = {
  id: "01a18436-345b-77d2-a774-eb6e867d1efd",
  type: "page-type/streaming-service",
  slug: "history-vault",
  title: "History Vault",
  providerNames: ["History Vault"],
  free: false,
  held: false,
  heldEvidence: "No Monarch charge to History Vault was found.",
  createdAt: "2026-10-28T20:31:47.287Z",
  updatedAt: "2026-10-28T20:31:47.287Z",
} as const satisfies StreamingService
