import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const homingShot = {
  id: "01a06575-981a-7cc7-bd70-96cd4db7b72f",
  type: "page-type/world-skill",
  slug: "homing-shot",
  title: "Homing Shot",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
