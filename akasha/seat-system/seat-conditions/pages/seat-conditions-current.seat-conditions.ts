import type { SeatConditions } from "../seat-conditions.page-type.ts"

export const seatConditionsCurrent = {
  id: "01a0157f-f2ec-7001-80d4-d83b4f922552",
  pageTypeSlug: "seat-conditions",
  slug: "seat-conditions-current",
  model: "opus",
  subagentModel: "none",
  fallbackModel: "fable",
  autoCompactWindow: 400000,
  effortLevel: "none",
  subagentSpawnDepth: 5,
  toolTimeout: 600000,
  resumeThresholdMinutes: 2147483647,
  resumeTokenThreshold: 2147483647,
  extendedContextAvailable: true,
} as const satisfies SeatConditions
