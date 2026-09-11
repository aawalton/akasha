import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const fastFeet = {
  id: "01a06575-980b-7b19-b706-fff56c8996c9",
  type: "world-skill",
  slug: "fast-feet",
  title: "Fast Feet",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
