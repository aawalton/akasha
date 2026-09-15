import type { WorldSkill } from "akasha/story/world-mechanic/world-skill/world-skill.page-type.types.ts"

export const hurricaneArrows = {
  id: "01a06575-981b-7d55-8312-8381cac47d8a",
  type: "world-skill",
  slug: "hurricane-arrows",
  title: "Hurricane Arrows",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
