import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const staticShield = {
  id: "01a0657d-02ef-7d4a-8259-0c5000adc70b",
  type: "page-type/world-skill",
  slug: "static-shield",
  title: "Static Shield",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
