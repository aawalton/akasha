import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const basicSpellcasting = {
  id: "01a06575-97f4-71ff-885e-dbb8f39dd32d",
  type: "page-type/world-skill",
  slug: "basic-spellcasting",
  title: "Basic Spellcasting",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.564Z",
  updatedAt: "2026-09-22T13:31:40.000Z",
} as const satisfies WorldSkill
