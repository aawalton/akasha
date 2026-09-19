import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const challenge = {
  id: "01a06575-97fa-7dfc-ba1a-1360e334da1f",
  type: "page-type/world-skill",
  slug: "challenge",
  title: "Challenge!",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
