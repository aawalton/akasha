import type { WorldCondition } from "akasha/story/world/mechanics/conditions/world-condition.page-type.types.ts"

export const overwhereIvHealthy = {
  id: "01a0f1b9-dc56-7888-834b-8945a70d07a6",
  type: "page-type/world-condition",
  slug: "overwhere-iv-healthy",
  title: "Healthy",
  world: "world/syl-a-slime-monster-evolution-litrpg",
  description: "The status of a body with no wound, sickness or affliction upon it.",
  createdAt: "2026-09-30T09:51:24.758Z",
  updatedAt: "2026-09-30T09:51:29.000Z",
} as const satisfies WorldCondition
