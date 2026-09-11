import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const battlefieldDustStorm = {
  id: "01a06575-97f4-7228-8b78-70a5d03cd3cd",
  type: "world-skill",
  slug: "battlefield-dust-storm",
  title: "Battlefield: Dust Storm",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
