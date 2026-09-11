import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const homingArrows = {
  id: "01a06575-981a-78cb-8fd5-031e8e2606f4",
  type: "world-skill",
  slug: "homing-arrows",
  title: "Homing Arrows",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
