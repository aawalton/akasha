import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const aSecondOfTime = {
  id: "01a06575-97e7-77cd-9224-1f8b100006f9",
  type: "page-type/world-skill",
  slug: "a-second-of-time",
  title: "A Second of Time",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
