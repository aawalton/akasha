import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const expertBartering = {
  id: "01a06575-980a-7d3d-98a1-6b2f832fe0ae",
  type: "world-skill",
  slug: "expert-bartering",
  title: "Expert Bartering",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
