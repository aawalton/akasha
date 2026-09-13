import type { Domain } from "akasha/domains/domain.page-type.types.ts"

export const seatUsage = {
  id: "01a09c33-c725-7ca6-9dea-f14f94961537",
  type: "domain",
  slug: "seat-usage",
  definition: "what a seat spends while an agent works in it",
  parts: [
    "module/seat-usage",
    "module/seat-usage-keep",
    "module/seat-usage-show",
    "module/typing-minutes",
  ],
} as const satisfies Domain
