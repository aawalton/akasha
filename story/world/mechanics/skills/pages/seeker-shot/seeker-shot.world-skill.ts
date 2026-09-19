import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const seekerShot = {
  id: "01a0657d-02b8-7651-9096-bc2f24071f47",
  type: "page-type/world-skill",
  slug: "seeker-shot",
  title: "Seeker Shot",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
