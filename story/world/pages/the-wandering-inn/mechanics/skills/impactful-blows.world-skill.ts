import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const impactfulBlows = {
  id: "01a06575-981d-744a-935f-1002635e71ec",
  type: "page-type/world-skill",
  slug: "impactful-blows",
  title: "Impactful Blows",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
