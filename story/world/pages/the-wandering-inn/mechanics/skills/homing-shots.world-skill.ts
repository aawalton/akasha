import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const homingShots = {
  id: "01a06575-981a-709f-b3a1-1ac6cc2ae581",
  type: "page-type/world-skill",
  slug: "homing-shots",
  title: "Homing Shots",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
