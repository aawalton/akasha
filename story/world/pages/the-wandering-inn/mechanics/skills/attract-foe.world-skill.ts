import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const attractFoe = {
  id: "01a06575-97ee-7113-939b-250ed7059763",
  type: "page-type/world-skill",
  slug: "attract-foe",
  title: "Attract Foe",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
