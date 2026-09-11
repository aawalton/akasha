import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const hygienicHands = {
  id: "01a06575-981b-71d3-9c64-0d1a31d37529",
  type: "world-skill",
  slug: "hygienic-hands",
  title: "Hygienic Hands",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
