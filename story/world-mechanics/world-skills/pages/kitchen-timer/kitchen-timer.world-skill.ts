import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const kitchenTimer = {
  id: "01a06575-9821-7471-9b2e-08179bf60826",
  type: "world-skill",
  slug: "kitchen-timer",
  title: "Kitchen Timer",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
