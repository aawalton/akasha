import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const auraShield = {
  id: "01a06575-97f0-789a-b4a7-a1718fff3ed3",
  type: "page-type/world-skill",
  slug: "aura-shield",
  title: "Aura Shield",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
