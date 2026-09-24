import type { SeatMode } from "akasha/agent/seat/mode/seat-mode.page-type.types.ts"

export const headless = {
  id: "01a0d4cf-b215-77cd-bea8-fbed0d5edd08",
  type: "page-type/seat-mode",
  slug: "headless",
  title: "Headless",
} as const satisfies SeatMode
