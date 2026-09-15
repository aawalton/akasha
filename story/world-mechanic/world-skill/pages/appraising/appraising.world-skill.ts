import type { WorldSkill } from "akasha/story/world-mechanic/world-skill/world-skill.page-type.types.ts"

export const appraising = {
  id: "01a06575-97ec-78d2-9904-175b23af690a",
  type: "world-skill",
  slug: "appraising",
  title: "Appraising",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
