import type { StreamingService } from "akasha/alan/collection/watching/streaming-service/streaming-service.page-type.types.ts"

export const amazonMxPlayer = {
  id: "01a18436-3459-705d-b1d8-24c523a645fa",
  type: "page-type/streaming-service",
  slug: "amazon-mx-player",
  title: "Amazon MX Player",
  providerNames: ["Amazon MX Player"],
  free: true,
  held: false,
  heldEvidence: "No Monarch charge to Amazon MX Player was found.",
  createdAt: "2026-10-28T20:31:47.287Z",
  updatedAt: "2026-10-28T20:31:47.287Z",
} as const satisfies StreamingService
