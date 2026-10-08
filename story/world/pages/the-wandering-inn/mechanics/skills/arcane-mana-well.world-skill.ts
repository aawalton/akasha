import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const arcaneManaWell = {
  id: "01a06575-97ec-7356-a716-8fbaa2677dfc",
  type: "page-type/world-skill",
  slug: "arcane-mana-well",
  title: "Arcane Mana Well",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.556Z",
  updatedAt: "2026-09-22T13:31:32.000Z",
} as const satisfies WorldSkill
