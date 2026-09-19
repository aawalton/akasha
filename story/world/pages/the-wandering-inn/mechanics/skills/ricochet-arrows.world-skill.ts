import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const ricochetArrows = {
  id: "01a0657d-02b2-7ad5-b9e2-08208bd2124e",
  type: "page-type/world-skill",
  slug: "ricochet-arrows",
  title: "Ricochet Arrows",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
