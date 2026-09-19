import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const extendedReach = {
  id: "01a06575-980a-78fc-b558-6f7014123a06",
  type: "page-type/world-skill",
  slug: "extended-reach",
  title: "Extended Reach",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
