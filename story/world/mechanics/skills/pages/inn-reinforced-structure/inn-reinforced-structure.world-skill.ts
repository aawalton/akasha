import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const innReinforcedStructure = {
  id: "01a06575-981f-7958-948d-44c2fbc481b2",
  type: "page-type/world-skill",
  slug: "inn-reinforced-structure",
  title: "Inn: Reinforced Structure",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
