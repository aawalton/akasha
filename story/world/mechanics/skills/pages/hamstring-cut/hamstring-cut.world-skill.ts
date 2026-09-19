import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const hamstringCut = {
  id: "01a06575-9818-7aa5-9b41-eec985ec8939",
  type: "page-type/world-skill",
  slug: "hamstring-cut",
  title: "Hamstring Cut",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
