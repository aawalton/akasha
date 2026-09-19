import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const planEmergencyDodge = {
  id: "01a0657d-0295-7add-981d-79a3fe65cc72",
  type: "page-type/world-skill",
  slug: "plan-emergency-dodge",
  title: "Plan: Emergency Dodge",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
