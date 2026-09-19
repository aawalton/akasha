import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const heal = {
  id: "01a06575-9819-70dc-80af-cb3974677a7d",
  type: "page-type/world-skill",
  slug: "heal",
  title: "Heal",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
