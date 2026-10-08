import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const drunkenManaWell = {
  id: "01a06575-9806-7c38-84f4-b2a8357225d4",
  type: "page-type/world-skill",
  slug: "drunken-mana-well",
  title: "Drunken Mana Well",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.582Z",
  updatedAt: "2026-09-22T13:32:04.000Z",
} as const satisfies WorldSkill
