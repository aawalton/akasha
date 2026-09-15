import type { WorldSkill } from "akasha/story/world-mechanic/world-skill/world-skill.page-type.types.ts"

export const everpiercingSwords = {
  id: "01a06575-9809-747f-8ef7-3d3480ef7415",
  type: "world-skill",
  slug: "everpiercing-swords",
  title: "Everpiercing Swords",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
