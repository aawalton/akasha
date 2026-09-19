import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const ricochetArrow = {
  id: "01a0657d-02b2-7ee8-9a51-3e8b596c59a6",
  type: "page-type/world-skill",
  slug: "ricochet-arrow",
  title: "Ricochet Arrow",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
