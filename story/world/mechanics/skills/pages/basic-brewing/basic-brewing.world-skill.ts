import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const basicBrewing = {
  id: "01a06575-97f3-74d4-98a7-22d4f1404e35",
  type: "page-type/world-skill",
  slug: "basic-brewing",
  title: "Basic Brewing",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
