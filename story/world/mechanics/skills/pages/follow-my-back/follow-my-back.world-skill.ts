import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const followMyBack = {
  id: "01a06575-980f-7986-a96f-82392d25febf",
  type: "page-type/world-skill",
  slug: "follow-my-back",
  title: "Follow My Back",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
