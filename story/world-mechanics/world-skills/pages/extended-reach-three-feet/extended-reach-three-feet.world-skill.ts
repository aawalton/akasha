import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const extendedReachThreeFeet = {
  id: "01a06575-980a-7b76-8369-fab136ec2437",
  type: "world-skill",
  slug: "extended-reach-three-feet",
  title: "Extended Reach: Three Feet",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
