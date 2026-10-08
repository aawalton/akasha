import type { WorldCondition } from "akasha/story/world/mechanics/conditions/world-condition.page-type.types.ts"

export const superSupportiveSkillFatigue = {
  id: "01a0e9f3-f5f6-75d9-a760-9a124daa2a68",
  type: "page-type/world-condition",
  slug: "super-supportive-skill-fatigue",
  title: "Skill fatigue",
  world: "world/super-supportive",
  aliases: ["full magical fatigue", "skill drain", "skill exhaustion"],
  description: "Exhaustion from overusing a skill, ending in an apathetic, placid collapse.",
  createdAt: "2026-09-28T21:37:54.678Z",
  updatedAt: "2026-09-28T21:37:57.000Z",
} as const satisfies WorldCondition
