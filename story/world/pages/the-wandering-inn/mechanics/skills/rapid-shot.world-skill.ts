import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const rapidShot = {
  id: "01a0657d-02a4-7def-b6a1-b120525f9b4d",
  type: "page-type/world-skill",
  slug: "rapid-shot",
  title: "Rapid Shot",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
