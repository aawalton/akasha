import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const anchoringShot = {
  id: "01a06575-97eb-7251-b5dd-4613eee156e8",
  type: "page-type/world-skill",
  slug: "anchoring-shot",
  title: "Anchoring Shot",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
