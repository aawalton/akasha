import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const armyLongstriders = {
  id: "01a06575-97ed-79ab-b658-3bde059b1961",
  type: "page-type/world-skill",
  slug: "army-longstriders",
  title: "Army: Longstriders",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
