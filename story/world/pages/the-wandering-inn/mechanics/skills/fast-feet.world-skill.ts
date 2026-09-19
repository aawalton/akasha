import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const fastFeet = {
  id: "01a06575-980b-7b19-b706-fff56c8996c9",
  type: "page-type/world-skill",
  slug: "fast-feet",
  title: "Fast Feet",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
