import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const superSupportiveDayPlanner = {
  id: "01a0e9f1-d241-79ac-8730-2c3909a0484c",
  type: "page-type/world-skill",
  slug: "super-supportive-day-planner",
  title: "Day Planner",
  world: "world/super-supportive",
  description: "A C-rank Rabbit skill for planning.",
} as const satisfies WorldSkill
