import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const formationReinforcedArmor = {
  id: "01a06575-9810-750b-b24b-d7bd3432424b",
  type: "page-type/world-skill",
  slug: "formation-reinforced-armor",
  title: "Formation: Reinforced Armor",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
