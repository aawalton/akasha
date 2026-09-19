import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const fourGoodLies = {
  id: "01a06575-9810-774e-949d-e8dd1a78862e",
  type: "page-type/world-skill",
  slug: "four-good-lies",
  title: "Four Good Lies",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
