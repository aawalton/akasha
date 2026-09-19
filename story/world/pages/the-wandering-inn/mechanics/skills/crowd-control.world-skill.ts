import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const crowdControl = {
  id: "01a06575-97ff-7a0f-845f-3883ae2d6be5",
  type: "page-type/world-skill",
  slug: "crowd-control",
  title: "Crowd Control",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
