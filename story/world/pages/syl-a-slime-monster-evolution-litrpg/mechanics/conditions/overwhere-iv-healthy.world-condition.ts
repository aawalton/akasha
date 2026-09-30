import type { WorldCondition } from "akasha/story/world/mechanics/conditions/world-condition.page-type.types.ts"

export const overwhereIvHealthy = {
  id: "01a0f1b9-dc56-7888-834b-8945a70d07a6",
  type: "page-type/world-condition",
  slug: "overwhere-iv-healthy",
  title: "Healthy",
  world: "world/syl-a-slime-monster-evolution-litrpg",
  description: "The status of a body with no wound, sickness or affliction upon it.",
} as const satisfies WorldCondition
