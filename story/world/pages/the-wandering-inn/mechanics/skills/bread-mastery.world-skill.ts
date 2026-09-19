import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const breadMastery = {
  id: "01a06575-97f8-7176-aaad-bfb7c94b36b1",
  type: "page-type/world-skill",
  slug: "bread-mastery",
  title: "Bread Mastery",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
