import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const enthrallingImagination = {
  id: "01a06575-9809-71af-a90f-a5527b376a8a",
  type: "page-type/world-skill",
  slug: "enthralling-imagination",
  title: "Enthralling Imagination",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
