import type { WorldSkill } from "akasha/story/world-mechanic/world-skill/world-skill.page-type.types.ts"

export const arcArrows = {
  id: "01a06575-97ec-75d2-a930-693c0e297b5b",
  type: "world-skill",
  slug: "arc-arrows",
  title: "Arc Arrows",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
