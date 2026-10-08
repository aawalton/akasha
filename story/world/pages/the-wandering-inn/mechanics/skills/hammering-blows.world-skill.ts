import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const hammeringBlows = {
  id: "01a06575-9818-75f9-9f42-7a5e12ed4607",
  type: "page-type/world-skill",
  slug: "hammering-blows",
  title: "Hammering Blows",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.600Z",
  updatedAt: "2026-09-22T13:32:19.000Z",
} as const satisfies WorldSkill
