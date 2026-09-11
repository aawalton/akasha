import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const expelPoisons = {
  id: "01a06575-980a-7b4a-9981-6661e3bd97c8",
  type: "world-skill",
  slug: "expel-poisons",
  title: "Expel Poisons",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
