import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const flashLunge = {
  id: "01a06575-980d-7bc8-9d98-57621eea99e2",
  type: "page-type/world-skill",
  slug: "flash-lunge",
  title: "Flash Lunge",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
