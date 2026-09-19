import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const flamePaw = {
  id: "01a06575-980d-775f-958b-670a353441ef",
  type: "page-type/world-skill",
  slug: "flame-paw",
  title: "Flame Paw",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
