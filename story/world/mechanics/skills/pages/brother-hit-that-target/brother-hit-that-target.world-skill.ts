import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const brotherHitThatTarget = {
  id: "01a06575-97f9-7eec-967b-7442f3d1d850",
  type: "page-type/world-skill",
  slug: "brother-hit-that-target",
  title: "Brother, Hit That Target",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
