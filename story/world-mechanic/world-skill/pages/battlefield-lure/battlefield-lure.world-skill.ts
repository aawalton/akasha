import type { WorldSkill } from "akasha/story/world-mechanic/world-skill/world-skill.page-type.types.ts"

export const battlefieldLure = {
  id: "01a06575-97f4-74b9-b100-8e135c8eca15",
  type: "world-skill",
  slug: "battlefield-lure",
  title: "Battlefield Lure",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
