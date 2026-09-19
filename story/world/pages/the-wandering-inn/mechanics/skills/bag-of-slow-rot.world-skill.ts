import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const bagOfSlowRot = {
  id: "01a06575-97f2-7b3a-b225-2cd6477085bf",
  type: "page-type/world-skill",
  slug: "bag-of-slow-rot",
  title: "Bag of Slow Rot",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
