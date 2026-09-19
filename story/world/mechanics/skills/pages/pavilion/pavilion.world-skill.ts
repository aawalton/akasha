import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const pavilion = {
  id: "01a0657d-028e-7c75-bb71-d639423351af",
  type: "page-type/world-skill",
  slug: "pavilion",
  title: "Pavilion",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
