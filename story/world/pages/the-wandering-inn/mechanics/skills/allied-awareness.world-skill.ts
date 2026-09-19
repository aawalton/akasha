import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const alliedAwareness = {
  id: "01a06575-97eb-700f-984d-4e8ead0ad7c4",
  type: "page-type/world-skill",
  slug: "allied-awareness",
  title: "Allied Awareness",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
