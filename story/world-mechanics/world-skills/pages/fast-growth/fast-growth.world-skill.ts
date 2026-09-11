import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const fastGrowth = {
  id: "01a06575-980b-7c34-8c8e-f2d21429acb8",
  type: "world-skill",
  slug: "fast-growth",
  title: "Fast Growth",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
