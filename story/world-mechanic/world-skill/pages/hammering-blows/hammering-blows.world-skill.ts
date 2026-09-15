import type { WorldSkill } from "akasha/story/world-mechanic/world-skill/world-skill.page-type.types.ts"

export const hammeringBlows = {
  id: "01a06575-9818-75f9-9f42-7a5e12ed4607",
  type: "world-skill",
  slug: "hammering-blows",
  title: "Hammering Blows",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
