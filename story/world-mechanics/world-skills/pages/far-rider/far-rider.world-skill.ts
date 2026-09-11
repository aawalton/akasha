import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const farRider = {
  id: "01a06575-980b-7659-b66a-d4eceaae050e",
  type: "world-skill",
  slug: "far-rider",
  title: "Far Rider",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
