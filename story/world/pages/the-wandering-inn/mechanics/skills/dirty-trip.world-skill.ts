import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const dirtyTrip = {
  id: "01a06575-9803-7f00-83c1-88ec75bbbbf7",
  type: "page-type/world-skill",
  slug: "dirty-trip",
  title: "Dirty Trip",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
