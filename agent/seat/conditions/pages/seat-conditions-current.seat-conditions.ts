import type { SeatConditions } from "akasha/agent/seat/conditions/seat-conditions.page-type.types.ts"

export const seatConditionsCurrent = {
  id: "01a0157f-f2ec-7001-80d4-d83b4f922552",
  type: "page-type/seat-conditions",
  slug: "seat-conditions-current",
  model: "opus",
  subagentModel: "none",
  autoCompactWindow: 1000000,
  effortLevel: "none",
  subagentSpawnDepth: 5,
  toolTimeout: 600000,
  resumeThresholdMinutes: 2147483647,
  resumeTokenThreshold: 2147483647,
  extendedContextAvailable: true,
  idleCompactWindow: 350000,
} as const satisfies SeatConditions
