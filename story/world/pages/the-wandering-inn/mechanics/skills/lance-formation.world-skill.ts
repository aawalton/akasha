import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const lanceFormation = {
  id: "01a06575-9821-759f-ba86-90bf23b8c76d",
  type: "page-type/world-skill",
  slug: "lance-formation",
  title: "Lance Formation",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
