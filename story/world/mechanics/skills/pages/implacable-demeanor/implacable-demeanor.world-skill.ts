import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const implacableDemeanor = {
  id: "01a06575-981d-7123-a07a-b5ad9b0a8dbd",
  type: "page-type/world-skill",
  slug: "implacable-demeanor",
  title: "Implacable Demeanor",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
