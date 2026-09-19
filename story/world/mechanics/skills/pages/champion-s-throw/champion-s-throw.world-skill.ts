import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const championSThrow = {
  id: "01a06575-97fa-79fc-aec1-1e4169db2c6c",
  type: "page-type/world-skill",
  slug: "champion-s-throw",
  title: "Champion’s Throw",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
