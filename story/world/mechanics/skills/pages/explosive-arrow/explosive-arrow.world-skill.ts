import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const explosiveArrow = {
  id: "01a06575-980a-704e-94c0-b7f7bbf9fde0",
  type: "page-type/world-skill",
  slug: "explosive-arrow",
  title: "Explosive Arrow",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
