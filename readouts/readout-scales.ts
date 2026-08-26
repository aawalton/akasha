import type { DailyTierLadder } from "./daily-tier.ts"

export const GREEN_DAY_UNITS_LADDER: DailyTierLadder = [
  { threshold: 0.25, color: "red" },
  { threshold: 0.5, color: "yellow" },
  { threshold: 1, color: "green" },
  { threshold: 2, color: "blue" },
]
