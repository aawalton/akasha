import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const filteredEntry = {
  id: "01a06575-980c-758c-b578-972356ee5101",
  type: "page-type/world-skill",
  slug: "filtered-entry",
  title: "Filtered Entry",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
