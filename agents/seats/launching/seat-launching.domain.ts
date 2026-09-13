import type { Domain } from "akasha/domains/domain.page-type.types.ts"

export const seatLaunching = {
  id: "01a09c3f-584c-7d66-b4ab-f3155d3b71bb",
  type: "domain",
  slug: "seat-launching",
  definition: "a seat started and put to work",
  parts: [
    "module/compose-boot",
    "module/launch-seat-tmux",
    "module/seat-call",
    "module/seat-conditions-reading",
    "module/seat-entry-paths",
    "module/seat-grouping",
    "module/seat-launching",
    "module/seat-modes",
    "module/seat-start",
    "module/spawn-seat",
  ],
} as const satisfies Domain
