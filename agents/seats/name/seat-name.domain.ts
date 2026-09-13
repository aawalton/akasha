import type { Domain } from "akasha/domains/domain.page-type.types.ts"

export const seatName = {
  id: "01a09c43-0bf5-7991-a2dc-650268201505",
  type: "domain",
  slug: "seat-name",
  definition: "the name a seat goes by",
  parts: [
    "module/compose-seat-name",
    "module/seat-flex",
    "module/seat-name-restate",
    "module/seat-name-stands",
    "module/seat-nameable",
    "module/seat-naming",
    "module/seat-rename",
    "module/seat-session-rename",
  ],
} as const satisfies Domain
