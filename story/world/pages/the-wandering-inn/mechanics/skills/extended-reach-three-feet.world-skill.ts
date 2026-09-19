import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const extendedReachThreeFeet = {
  id: "01a06575-980a-7b76-8369-fab136ec2437",
  type: "page-type/world-skill",
  slug: "extended-reach-three-feet",
  title: "Extended Reach: Three Feet",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
