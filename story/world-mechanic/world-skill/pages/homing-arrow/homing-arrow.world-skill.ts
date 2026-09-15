import type { WorldSkill } from "akasha/story/world-mechanic/world-skill/world-skill.page-type.types.ts"

export const homingArrow = {
  id: "01a06575-981a-799d-87d9-530c88aec2e0",
  type: "world-skill",
  slug: "homing-arrow",
  title: "Homing Arrow",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
