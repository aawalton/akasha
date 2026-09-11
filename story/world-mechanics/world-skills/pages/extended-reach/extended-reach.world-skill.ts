import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const extendedReach = {
  id: "01a06575-980a-78fc-b558-6f7014123a06",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "extended-reach",
  title: "Extended Reach",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
