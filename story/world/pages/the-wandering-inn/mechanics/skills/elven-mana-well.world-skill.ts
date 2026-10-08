import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const elvenManaWell = {
  id: "01a06575-9807-7ed5-8a37-71a00cc82d8e",
  type: "page-type/world-skill",
  slug: "elven-mana-well",
  title: "Elven Mana Well",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.583Z",
  updatedAt: "2026-09-22T13:32:04.000Z",
} as const satisfies WorldSkill
