import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const flashStrike = {
  id: "01a06575-980e-71cf-91d0-e2bf37dcc254",
  type: "page-type/world-skill",
  slug: "flash-strike",
  title: "Flash Strike",
  world: "world/the-wandering-inn",
  appearanceCount: 3,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.590Z",
  updatedAt: "2026-09-22T13:32:12.000Z",
} as const satisfies WorldSkill
