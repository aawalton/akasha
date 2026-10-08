import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const boonOfBird = {
  id: "01a06575-97f7-70e1-90b3-f7db3eaf48fa",
  type: "page-type/world-skill",
  slug: "boon-of-bird",
  title: "Boon of Bird",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.567Z",
  updatedAt: "2026-09-22T13:31:48.000Z",
} as const satisfies WorldSkill
