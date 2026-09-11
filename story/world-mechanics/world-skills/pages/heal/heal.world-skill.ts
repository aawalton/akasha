import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const heal = {
  id: "01a06575-9819-70dc-80af-cb3974677a7d",
  type: "world-skill",
  slug: "heal",
  title: "Heal",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
