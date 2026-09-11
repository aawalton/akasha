import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const highJump = {
  id: "01a06575-981a-7eb4-be8d-59a0554396bd",
  type: "world-skill",
  slug: "high-jump",
  title: "High Jump",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
