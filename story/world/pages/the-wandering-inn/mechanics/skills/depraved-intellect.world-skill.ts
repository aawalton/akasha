import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const depravedIntellect = {
  id: "01a06575-9803-7d0c-ac7a-8290d8927ceb",
  type: "page-type/world-skill",
  slug: "depraved-intellect",
  title: "Depraved Intellect",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
