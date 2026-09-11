import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const hitAndAway = {
  id: "01a06575-981a-7402-9b1a-d0b3957fb2bb",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "hit-and-away",
  title: "Hit and Away",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
