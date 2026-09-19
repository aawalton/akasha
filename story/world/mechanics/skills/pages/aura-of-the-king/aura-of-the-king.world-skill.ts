import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const auraOfTheKing = {
  id: "01a06575-97f0-787f-be9a-784555926abb",
  type: "page-type/world-skill",
  slug: "aura-of-the-king",
  title: "Aura of the King",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
