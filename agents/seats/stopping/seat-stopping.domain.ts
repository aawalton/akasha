import type { Domain } from "akasha/domains/domain.page-type.types.ts"

export const seatStopping = {
  id: "01a09c30-449d-7442-b72d-a0198593d629",
  type: "domain",
  slug: "seat-stopping",
  definition: "a seat brought to an end",
  parts: [
    "module/kill-target-plan",
    "module/seat-stopping",
    "module/stop-seat",
    "module/takeover-seat",
  ],
} as const satisfies Domain
