import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const auraOfTheBird = {
  id: "01a06575-97ef-75c3-9243-7dc4bdfe5083",
  type: "page-type/world-skill",
  slug: "aura-of-the-bird",
  title: "Aura of the Bird",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
