import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const battlefieldAwareness = {
  id: "01a06575-97f4-763c-8b59-f4a42f9090e8",
  type: "world-skill",
  slug: "battlefield-awareness",
  title: "Battlefield Awareness",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
