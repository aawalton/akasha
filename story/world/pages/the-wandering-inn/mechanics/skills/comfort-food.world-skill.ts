import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const comfortFood = {
  id: "01a06575-97fc-7349-bf9a-818cbb01c5e1",
  type: "page-type/world-skill",
  slug: "comfort-food",
  title: "Comfort Food",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
