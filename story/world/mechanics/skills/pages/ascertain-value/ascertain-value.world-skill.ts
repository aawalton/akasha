import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const ascertainValue = {
  id: "01a06575-97ed-7d53-8a6d-d1bb6f1445f3",
  type: "page-type/world-skill",
  slug: "ascertain-value",
  title: "Ascertain Value",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
