import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const takeARelaxedBreath = {
  id: "01a0657d-0307-74d6-b9fb-d14b68d7d9be",
  type: "page-type/world-skill",
  slug: "take-a-relaxed-breath",
  title: "Take a Relaxed Breath",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
