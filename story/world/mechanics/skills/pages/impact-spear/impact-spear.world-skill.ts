import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const impactSpear = {
  id: "01a06575-981d-79f2-8ec6-c37cbd48c242",
  type: "page-type/world-skill",
  slug: "impact-spear",
  title: "Impact Spear",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
