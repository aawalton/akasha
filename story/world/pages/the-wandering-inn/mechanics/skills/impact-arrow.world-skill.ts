import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const impactArrow = {
  id: "01a06575-981d-75a3-b287-85316418e517",
  type: "page-type/world-skill",
  slug: "impact-arrow",
  title: "Impact Arrow",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
