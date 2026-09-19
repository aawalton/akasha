import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const flashCut = {
  id: "01a06575-980d-7fe8-8007-6c26f8829478",
  type: "page-type/world-skill",
  slug: "flash-cut",
  title: "Flash Cut",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
