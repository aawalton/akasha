import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const fastTravelCamp = {
  id: "01a06575-980c-75e9-a938-1867464d9a9f",
  type: "page-type/world-skill",
  slug: "fast-travel-camp",
  title: "Fast Travel (Camp)",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
