import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const arrowGrab = {
  id: "01a06575-97ed-7d24-b6de-c43cd4aea650",
  type: "page-type/world-skill",
  slug: "arrow-grab",
  title: "Arrow Grab",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
