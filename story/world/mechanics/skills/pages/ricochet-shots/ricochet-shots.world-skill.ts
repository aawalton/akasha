import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const ricochetShots = {
  id: "01a0657d-02b2-7256-ac08-295528696d7b",
  type: "page-type/world-skill",
  slug: "ricochet-shots",
  title: "Ricochet Shots",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
