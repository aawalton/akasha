import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const adventurerSFieldAlchemy = {
  id: "01a06575-97e9-73c7-9896-237350a1c1f7",
  type: "page-type/world-skill",
  slug: "adventurer-s-field-alchemy",
  title: "Adventurer’s Field Alchemy",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
