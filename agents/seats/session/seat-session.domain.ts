import type { Domain } from "akasha/domains/domain.page-type.types.ts"

export const seatSession = {
  id: "01a09c35-1b1e-723d-8282-39539632d329",
  type: "domain",
  slug: "seat-session",
  definition: "the session a seat is bound to and the transcript that session writes",
  parts: [
    "module/seat-rotated-session",
    "module/seat-session",
    "module/seat-session-resolve",
    "module/seat-transcript-path",
    "module/seat-transcript-rotation",
  ],
} as const satisfies Domain
